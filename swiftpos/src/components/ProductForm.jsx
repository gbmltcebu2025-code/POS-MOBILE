import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const empty = { name: '', sku: '', price: '', category: '', stock_quantity: '', low_stock_threshold: 5 };

export default function ProductForm({ product, isOpen, onClose, onSave }) {
  const [form, setForm] = useState(empty);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || '',
        sku: product.sku || '',
        price: product.price ?? '',
        category: product.category || '',
        stock_quantity: product.stock_quantity ?? '',
        low_stock_threshold: product.low_stock_threshold ?? 5,
      });
    } else {
      setForm(empty);
    }
  }, [product, isOpen]);

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      name: form.name,
      sku: form.sku,
      price: Number(form.price),
      category: form.category,
      stock_quantity: Number(form.stock_quantity) || 0,
      low_stock_threshold: Number(form.low_stock_threshold) || 5,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{product ? 'Edit Product' : 'Add Product'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={form.name} onChange={set('name')} required autoFocus />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="sku">SKU / Barcode</Label>
            <Input id="sku" value={form.sku} onChange={set('sku')} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="price">Price ($)</Label>
              <Input id="price" type="number" step="0.01" min="0" value={form.price} onChange={set('price')} required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="category">Category</Label>
              <Input id="category" value={form.category} onChange={set('category')} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="stock">Stock Quantity</Label>
              <Input id="stock" type="number" min="0" value={form.stock_quantity} onChange={set('stock_quantity')} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="threshold">Low Stock Alert</Label>
              <Input id="threshold" type="number" min="0" value={form.low_stock_threshold} onChange={set('low_stock_threshold')} />
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <Button type="submit" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
              Save
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}