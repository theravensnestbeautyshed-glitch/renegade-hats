import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Switch } from "../components/ui/switch";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../components/ui/alert-dialog";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { HatEditor } from "../components/HatEditor";
import { api, formatCAD } from "../lib/api";

const KEY = "renegade_admin";

const Empty = () => <p className="py-8 text-[#A3978C]">Nothing here yet.</p>;

const Card = ({ children, testId }) => (
  <div className="border border-[#C87D53]/20 bg-[#16120E] p-5" data-testid={testId}>{children}</div>
);

export default function Admin() {
  const [pass, setPass] = useState(() => sessionStorage.getItem(KEY) || "");
  const [input, setInput] = useState("");
  const [data, setData] = useState(null);
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const onSaved = (saved) => {
    setProducts((ps) => (ps.some((p) => p.slug === saved.slug) ? ps.map((p) => (p.slug === saved.slug ? saved : p)) : [...ps, saved]));
    setEditing(null);
  };

  const confirmDelete = async () => {
    const slug = deleting?.slug;
    setDeleting(null);
    try {
      await api.delete(`/admin/products/${slug}`, { headers: { "X-Admin-Passcode": pass } });
      setProducts((ps) => ps.filter((p) => p.slug !== slug));
      toast.success("Hat removed from the shop");
    } catch {
      toast.error("Delete failed");
    }
  };

  const load = useCallback(async (code) => {
    try {
      const headers = { "X-Admin-Passcode": code };
      const [d, p] = await Promise.all([api.get("/admin/data", { headers }), api.get("/products")]);
      setData(d.data);
      setProducts(Array.isArray(p.data) ? p.data : []);
      sessionStorage.setItem(KEY, code);
      setPass(code);
    } catch {
      sessionStorage.removeItem(KEY);
      setPass("");
      toast.error("Invalid passcode");
    }
  }, []);

  useEffect(() => {
    if (pass) load(pass);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleSold = async (slug, sold) => {
    try {
      await api.patch(`/admin/products/${slug}`, { sold }, { headers: { "X-Admin-Passcode": pass } });
      setProducts((ps) => ps.map((p) => (p.slug === slug ? { ...p, sold } : p)));
      toast.success(sold ? "Marked as sold out" : "Marked as available");
    } catch {
      toast.error("Update failed");
    }
  };

  if (!data)
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-5 py-16" data-testid="admin-login">
        <h1 className="font-cinzel mb-6 text-3xl font-black uppercase">Back Room</h1>
        <form onSubmit={(e) => { e.preventDefault(); load(input); }} className="space-y-4">
          <input type="password" className="field" placeholder="Passcode" value={input} onChange={(e) => setInput(e.target.value)} data-testid="admin-passcode-input" />
          <button className="btn-primary w-full" data-testid="admin-login-button">Enter</button>
        </form>
      </div>
    );

  const contacts = data.contacts || [];
  const orders = data.orders || [];
  const subs = data.subscribers || [];

  return (
    <div className="mx-auto max-w-[1200px] px-5 pb-28 pt-10 sm:px-8" data-testid="admin-dashboard">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-cinzel text-3xl font-black uppercase sm:text-4xl">Back Room</h1>
        <button onClick={() => { sessionStorage.removeItem(KEY); setData(null); setPass(""); }} className="btn-ghost px-4 py-2" data-testid="admin-logout">Log out</button>
      </div>
      <Tabs defaultValue="hats">
        <TabsList className="mb-6 flex h-auto flex-wrap justify-start gap-1 bg-transparent p-0">
          {[["hats", `Hats (${products.length})`], ["messages", `Messages (${contacts.length})`], ["orders", `Orders (${orders.length})`], ["subs", `Subscribers (${subs.length})`]].map(([v, l]) => (
            <TabsTrigger key={v} value={v} className="border border-[#C87D53]/25 px-4 py-2 text-xs uppercase tracking-[0.15em] data-[state=active]:bg-[#C87D53] data-[state=active]:text-[#0D0B08]" data-testid={`admin-tab-${v}`}>{l}</TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="hats" className="space-y-3">
          <button onClick={() => setEditing("new")} className="btn-primary w-full sm:w-auto" data-testid="admin-add-hat">
            <Plus className="h-5 w-5" /> Add New Hat
          </button>
          {products.map((p) => (
            <Card key={p.slug} testId={`admin-hat-${p.slug}`}>
              <div className="flex flex-wrap items-center gap-4">
                <img src={p.images?.[0]} alt="" className="h-16 w-16 object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="font-caslon font-bold uppercase tracking-[0.1em]">{p.name}</p>
                  <p className="text-sm text-[#D9935F]">{formatCAD(p.price)}</p>
                </div>
                <label className="flex items-center gap-3 text-xs uppercase tracking-[0.15em] text-[#A3978C]">
                  Sold
                  <Switch checked={!!p.sold} onCheckedChange={(v) => toggleSold(p.slug, v)} data-testid={`admin-sold-toggle-${p.slug}`} />
                </label>
                <div className="flex gap-2">
                  <button onClick={() => setEditing(p)} className="btn-ghost min-h-[44px] px-4" data-testid={`admin-edit-${p.slug}`}><Pencil className="h-4 w-4" /> Edit</button>
                  <button onClick={() => setDeleting(p)} className="btn-ghost min-h-[44px] px-3 hover:text-[#e0573f]" aria-label={`Delete ${p.name}`} data-testid={`admin-delete-${p.slug}`}><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="messages" className="space-y-3">
          {contacts.length === 0 ? <Empty /> : contacts.map((c) => (
            <Card key={c.id} testId={`admin-message-${c.id}`}>
              <p className="font-cinzel text-lg font-bold">{c.name} · <span className="text-sm font-normal text-[#A3978C]">{c.email} {c.phone}</span></p>
              <p className="mt-2 whitespace-pre-wrap">{c.message}</p>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="orders" className="space-y-3">
          {orders.length === 0 ? <Empty /> : orders.map((o) => (
            <Card key={o.id} testId={`admin-order-${o.id}`}>
              <p className="font-mono-plex text-sm text-[#A3978C]">{new Date(o.created_at).toLocaleString()}</p>
              <p className="mt-1 font-semibold">{(o.slugs || []).join(", ")}</p>
              <p className="font-mono-plex text-[#C87D53]">{formatCAD(o.amount)}</p>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="subs" className="space-y-2">
          {subs.length === 0 ? <Empty /> : subs.map((s) => (
            <Card key={s.email} testId={`admin-sub-${s.email}`}>
              <p>{s.email}</p>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
      {editing && <HatEditor key={editing === "new" ? "new" : editing.slug} hat={editing === "new" ? null : editing} open onClose={() => setEditing(null)} onSaved={onSaved} pass={pass} />}
      <AlertDialog open={!!deleting} onOpenChange={(v) => !v && setDeleting(null)}>
        <AlertDialogContent className="border-[#C87D53]/40 bg-[#0D0B08] text-[#EFE3CC]" data-testid="admin-delete-dialog">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-rye text-2xl uppercase">Remove {deleting?.name}?</AlertDialogTitle>
            <AlertDialogDescription className="text-[#B9AC9C]">This takes the hat off the shop for good. Past orders are kept.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="btn-ghost rounded-none" data-testid="admin-delete-cancel">Keep It</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="btn-primary rounded-none" data-testid="admin-delete-confirm">Remove Hat</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
