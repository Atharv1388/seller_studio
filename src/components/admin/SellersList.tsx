import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/rootReducer";
import { fetchSellersRequest } from "@/redux/Admin/action";

interface Seller {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  country: string;
  state: string;
  skills: string[];
  createdAt: string;
}

interface SellersListProps {
  refreshTrigger?: number;
}

export function SellersList({ refreshTrigger }: SellersListProps) {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const { sellers, pagination, admin } = useSelector((state: RootState) => state.admin as any);
  const loading = admin?.loading;

  useEffect(() => {
    dispatch(fetchSellersRequest({ page: currentPage, limit: ITEMS_PER_PAGE }));
  }, [dispatch, currentPage, refreshTrigger]);

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
    <Card>
      <CardHeader>
        <CardTitle>All Sellers</CardTitle>
        <CardDescription>Total: {pagination?.total ?? sellers.length} sellers</CardDescription>
      </CardHeader>
      <CardContent>
        {sellers.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No sellers found</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Mobile</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Skills</TableHead>
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sellers.map((seller: Seller) => (
                    <TableRow key={seller._id}>
                      <TableCell className="font-medium">{seller.name}</TableCell>
                      <TableCell>{seller.email}</TableCell>
                      <TableCell>{seller.mobile}</TableCell>
                      <TableCell>
                        {seller.country}, {seller.state}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {seller.skills.slice(0, 3).map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {seller.skills.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{seller.skills.length - 3}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(seller.createdAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {(pagination?.pages ?? 1) > 1 && (
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Page {pagination?.page ?? currentPage} of {pagination?.pages ?? 1}
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
                    onClick={() => setCurrentPage(prev => Math.min(pagination?.pages ?? prev, prev + 1))}
                    disabled={(pagination?.page ?? currentPage) === (pagination?.pages ?? 1)}
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
  )
};