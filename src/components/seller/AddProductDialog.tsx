import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useDispatch } from "react-redux";
import { addProductRequest } from "@/redux/Seller/action";

interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProductAdded: () => void;
}

interface Brand {
  brand_name: string;
  detail: string;
  price: string;
}

export function AddProductDialog({ open, onOpenChange, onProductAdded }: AddProductDialogProps) {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [brands, setBrands] = useState<Brand[]>([
    { brand_name: "", detail: "", price: "" }
  ]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const dispatch = useDispatch();

  const resetForm = () => {
    setProductName("");
    setProductDescription("");
    setBrands([{ brand_name: "", detail: "", price: "" }]);
  };

  const addBrand = () => {
    setBrands([...brands, { brand_name: "", detail: "", price: "" }]);
  };

  const removeBrand = (index: number) => {
    setBrands(brands.filter((_, i) => i !== index));
  };

  const updateBrand = (index: number, field: keyof Brand, value: any) => {
    const newBrands = [...brands];
    newBrands[index] = { ...newBrands[index], [field]: value };
    setBrands(newBrands);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!productName || !productDescription) {
      toast({
        title: "Validation Error",
        description: "Please fill in all product details",
        variant: "destructive",
      });
      return;
    }

    for (const brand of brands) {
      if (!brand.brand_name || !brand.detail || !brand.price) {
        toast({
          title: "Validation Error",
          description: "Please fill in all brand details",
          variant: "destructive",
        });
        return;
      }
    }

    setLoading(true);

    try {
      // Map UI brands -> API schema brands
      const mappedBrands = brands.map(b => ({
        name: b.brand_name.trim(),
        detail: b.detail.trim(),
        price: Number(b.price),
      }));

      dispatch(addProductRequest({
        name: productName.trim(),
        description: productDescription.trim(),
        brands: mappedBrands,
      } as any));

      toast({ title: "Success", description: "Product added successfully" });
      resetForm();
      onOpenChange(false);
      onProductAdded();
    } catch (error: any) {
      console.error("Error adding product:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to add product",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Fill in the product details and add multiple brands
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="productName">Product Name *</Label>
              <Input
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g., Mouse"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="productDescription">Product Description *</Label>
              <Textarea
                id="productDescription"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                placeholder="Describe your product"
                rows={3}
                required
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Brands *</Label>
                <Button type="button" variant="outline" size="sm" onClick={addBrand}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Brand
                </Button>
              </div>

              {brands.map((brand, index) => (
                <Card key={index} className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">Brand #{index + 1}</h4>
                      {brands.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeBrand(index)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Brand Name *</Label>
                        <Input
                          value={brand.brand_name}
                          onChange={(e) => updateBrand(index, "brand_name", e.target.value)}
                          placeholder="e.g., Dell"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Price *</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={brand.price}
                          onChange={(e) => updateBrand(index, "price", e.target.value)}
                          placeholder="e.g., 1000"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Detail *</Label>
                      <Textarea
                        value={brand.detail}
                        onChange={(e) => updateBrand(index, "detail", e.target.value)}
                        placeholder="Brand details"
                        rows={2}
                        required
                      />
                    </div>

                    {null}
                  </div>
                </Card>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                "Add Product"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}