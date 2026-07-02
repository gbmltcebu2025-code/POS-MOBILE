import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Printer, CheckCircle } from 'lucide-react';

export default function ReceiptModal({ transaction, onClose }) {
  const open = !!transaction;
  const date = transaction ? new Date(transaction.created_date || Date.now()) : new Date();

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-sm no-print">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-primary" />
            Sale Complete
          </DialogTitle>
        </DialogHeader>

        {transaction && (
          <>
            <div className="print-receipt bg-white text-black rounded-lg p-6 font-mono text-sm leading-relaxed">
              <div className="text-center mb-3">
                <h2 className="font-bold text-lg">SwiftPOS</h2>
                <p className="text-xs text-gray-500">{date.toLocaleString()}</p>
              </div>
              <div className="border-t border-b border-dashed border-gray-300 py-2 mb-2">
                {transaction.items.map((item, i) => (
                  <div key={i} className="flex justify-between py-0.5">
                    <span className="truncate pr-2">
                      {item.quantity}× {item.name}
                    </span>
                    <span>${item.line_total.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-0.5">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${transaction.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax ({transaction.tax_rate}%)</span>
                  <span>${transaction.tax_amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-base pt-1 border-t border-gray-300 mt-1">
                  <span>TOTAL</span>
                  <span>${transaction.total.toFixed(2)}</span>
                </div>
              </div>
              <p className="text-center text-xs text-gray-400 mt-4">Thank you for your purchase!</p>
            </div>

            <div className="flex gap-2 mt-4 no-print">
              <Button
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => window.print()}
              >
                <Printer className="w-4 h-4 mr-2" /> Print Receipt
              </Button>
              <Button variant="outline" onClick={onClose}>
                New Sale
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}