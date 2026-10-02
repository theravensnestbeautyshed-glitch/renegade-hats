import { useRef, useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Upload, X, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { api } from "../lib/api";

const EMPTY = { name: "", price: "", subtitle: "", tagline: "", description: "", story: "", size: "", material: "", colour: "", hatband: "", handmade: "Handmade in Powell River, BC", details: [], images: [], sold: false };
const TEXT_FIELDS = [
  ["name", "Hat name *"], ["price", "Price (CAD) *"], ["subtitle", "Short description (shown on cards)"], ["tagline", "Tagline"],
  ["size", "Hat size"], ["material", "Material"], ["colour", "Colour"], ["hatband", "Hatband"], ["handmade", "Handmade"],
];

const Label = ({ children }) => <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-[#C9B9A0]">{children}</span>;

const Photos = ({ images, setImages, pass }) => {
  const input = useRef(null);
  const [busy, setBusy] = useState(false);
  const upload = async (files) => {
    setBusy(true);
    try {
      for (const f of Array.from(files)) {
        const fd = new FormData();
        fd.append("file", f);
        const { data } = await api.post("/admin/upload", fd, { headers: { "X-Admin-Passcode": pass } });
        if (data?.url) setImages((prev) => [...prev, data.url]);
      }
    } catch (e) {
      toast.error(e?.response?.data?.detail || "Upload failed");
    } finally {
      setBusy(false);
      if (input.current) input.current.value = "";
    }
  };
  const move = (i, d) => setImages((prev) => {
    const next = [...prev];
    const j = i + d;
    if (j < 0 || j >= next.length) return prev;
    [next[i], next[j]] = [next[j], next[i]];
    return next;
  });
  return (
    <div data-testid="hat-editor-photos">
      <Label>Photos * (first photo is the main one)</Label>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {images.map((src, i) => (
          <div key={src + i} className={`relative aspect-square overflow-hidden border ${i === 0 ? "border-[#C87D53]" : "border-[#C87D53]/25"}`} data-testid={`hat-editor-photo-${i}`}>
            <img src={src} alt="" className="h-full w-full object-cover" />
            {i === 0 && <span className="absolute left-1 top-1 bg-[#C87D53] px-1.5 py-0.5 text-[10px] font-bold uppercase text-[#0D0B08]">Main</span>}
            <button type="button" onClick={() => setImages((prev) => prev.filter((_, k) => k !== i))} className="absolute right-1 top-1 bg-[#0D0B08]/80 p-1 text-[#EFE3CC] hover:text-[#e0573f]" aria-label="Remove photo" data-testid={`hat-editor-photo-remove-${i}`}><X className="h-4 w-4" /></button>
            <div className="absolute inset-x-1 bottom-1 flex justify-between">
              <button type="button" onClick={() => move(i, -1)} className="bg-[#0D0B08]/80 p-1 text-[#EFE3CC] disabled:opacity-30" disabled={i === 0} aria-label="Move left" data-testid={`hat-editor-photo-left-${i}`}><ArrowLeft className="h-4 w-4" /></button>
              <button type="button" onClick={() => move(i, 1)} className="bg-[#0D0B08]/80 p-1 text-[#EFE3CC] disabled:opacity-30" disabled={i === images.length - 1} aria-label="Move right" data-testid={`hat-editor-photo-right-${i}`}><ArrowRight className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
        <button type="button" onClick={() => input.current?.click()} disabled={busy} className="flex aspect-square flex-col items-center justify-center gap-2 border border-dashed border-[#C87D53]/50 text-xs uppercase tracking-[0.14em] text-[#C9B9A0] hover:border-[#C87D53] hover:text-[#EFE3CC]" data-testid="hat-editor-upload-button">
          {busy ? <Loader2 className="h-6 w-6 animate-spin" /> : <Upload className="h-6 w-6" />}
          {busy ? "Uploading…" : "Add photos"}
        </button>
      </div>
      <input ref={input} type="file" accept="image/jpeg,image/png,image/webp,image/heic,image/heif" multiple hidden onChange={(e) => e.target.files?.length && upload(e.target.files)} data-testid="hat-editor-file-input" />
    </div>
  );
};

export const HatEditor = ({ hat, open, onClose, onSaved, pass }) => {
  const [f, setF] = useState(() => (hat ? { ...EMPTY, ...hat, price: String(hat.price ?? "") } : EMPTY));
  const [detailsText, setDetailsText] = useState(() => (hat?.details || []).join("\n"));
  const [saving, setSaving] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const setImages = (fn) => setF((prev) => ({ ...prev, images: typeof fn === "function" ? fn(prev.images) : fn }));

  const save = async (e) => {
    e.preventDefault();
    if (!f.images.length) return toast.error("Add at least one photo");
    const price = parseFloat(f.price);
    if (!(price > 0)) return toast.error("Enter a valid price");
    setSaving(true);
    const body = { ...f, price, details: detailsText.split("\n").map((s) => s.trim()).filter(Boolean) };
    ["id", "slug", "currency"].forEach((k) => delete body[k]);
    try {
      const headers = { "X-Admin-Passcode": pass };
      const { data } = hat ? await api.put(`/admin/products/${hat.slug}`, body, { headers }) : await api.post("/admin/products", body, { headers });
      toast.success(hat ? "Hat updated" : "Hat added to the shop");
      onSaved(data);
    } catch (err) {
      const d = err?.response?.data?.detail;
      toast.error(typeof d === "string" ? d : "Please check the required fields");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-h-[92vh] max-w-3xl overflow-y-auto border-[#C87D53]/40 bg-[#0D0B08] p-0 text-[#EFE3CC]" data-lenis-prevent data-testid="hat-editor">
        <div className="tex-wood border-b border-[#C87D53]/30 px-5 py-4 sm:px-7">
          <DialogTitle className="font-rye text-3xl uppercase">{hat ? `Edit ${hat.name}` : "Add a New Hat"}</DialogTitle>
          <DialogDescription className="text-xs text-[#B9AC9C]">Changes appear on the shop and hat page as soon as you save.</DialogDescription>
        </div>
        <form onSubmit={save} className="space-y-5 px-5 py-6 sm:px-7">
          <Photos images={f.images} setImages={setImages} pass={pass} />
          <div className="grid gap-4 sm:grid-cols-2">
            {TEXT_FIELDS.map(([k, l]) => (
              <label key={k} className="block">
                <Label>{l}</Label>
                <input className="field" inputMode={k === "price" ? "decimal" : undefined} required={k === "name" || k === "price"} value={f[k]} onChange={set(k)} data-testid={`hat-editor-${k}-input`} />
              </label>
            ))}
          </div>
          <label className="block">
            <Label>Description * (shown near the price)</Label>
            <textarea required rows={3} className="field resize-y" value={f.description} onChange={set("description")} data-testid="hat-editor-description-input" />
          </label>
          <label className="block">
            <Label>The story behind the hat</Label>
            <textarea rows={5} className="field resize-y" value={f.story} onChange={set("story")} data-testid="hat-editor-story-input" />
          </label>
          <label className="block">
            <Label>Details / embellishments (one per line)</Label>
            <textarea rows={4} className="field resize-y" value={detailsText} onChange={(e) => setDetailsText(e.target.value)} data-testid="hat-editor-details-input" />
          </label>
          <label className="flex items-center gap-3 text-sm">
            <input type="checkbox" checked={!!f.sold} onChange={(e) => setF({ ...f, sold: e.target.checked })} className="h-5 w-5 accent-[#C87D53]" data-testid="hat-editor-sold-checkbox" />
            Mark as sold
          </label>
          <div className="flex flex-col-reverse gap-3 border-t border-[#C87D53]/20 pt-5 sm:flex-row sm:justify-end">
            <button type="button" onClick={onClose} className="btn-ghost" data-testid="hat-editor-cancel">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary" data-testid="hat-editor-save">{saving ? "Saving…" : hat ? "Save Changes" : "Add Hat"}</button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
