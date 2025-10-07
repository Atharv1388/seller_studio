import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Loader2, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/rootReducer";
import { fetchProductRequest, deleteProductRequest } from "@/redux/Seller/action";

interface Brand { name: string; detail: string; image?: string | null; price: number; }
interface Product { _id: string; name: string; description: string; createdAt: string; brands: Brand[]; }

interface ProductsListProps {
  refreshTrigger?: number;
}

export function ProductsList({ refreshTrigger }: ProductsListProps) {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  const { products, pagination, loading } = useSelector((state: RootState) => state.seller as any);

  useEffect(() => {
    dispatch(fetchProductRequest({ page: currentPage, limit: ITEMS_PER_PAGE }));
  }, [dispatch, currentPage, refreshTrigger]);

  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const total = pagination?.total ?? products.length;
  const totalPages = pagination?.pages ?? Math.max(1, Math.ceil(total / ITEMS_PER_PAGE));

  const handleDelete = async () => {
    if (!deleteProductId) return;
    setDeleting(true);
    try {
      dispatch(deleteProductRequest(deleteProductId));
      toast({ title: "Success", description: "Product deleted successfully" });
      setDeleteProductId(null);
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to delete product", variant: "destructive" });
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>My Products</CardTitle>
          <CardDescription>Total: {total} products</CardDescription>
        </CardHeader>
        <CardContent>
          {products.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No products found</p>
          ) : (
            <>
              <div className="space-y-4">
                {products.map((product) => (
                  <Card key={product._id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{product.name}</CardTitle>
                          <CardDescription>{product.description}</CardDescription>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteProductId(product._id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Brands:</h4>
                        <div className="grid gap-2">
                          {product.brands.map((brand) => (
                            <div key={`${brand.name}-${brand.detail}`} className="flex items-center gap-4 rounded-lg border p-3">
                              {brand.image && (
                                <img src={brand.image} alt={brand.name} className="h-16 w-16 rounded object-cover" />
                              )}
                              <div className="flex-1">
                                <p className="font-medium">{brand.name}</p>
                                <p className="text-sm text-muted-foreground">{brand.detail}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold">${brand.price}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {(totalPages > 1) && (
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Page {pagination?.page ?? currentPage} of {totalPages}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={(pagination?.page ?? currentPage) === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={(pagination?.page ?? currentPage) === totalPages}
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={!!deleteProductId} onOpenChange={() => setDeleteProductId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this product and all its brands. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={deleting}>
              {deleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}