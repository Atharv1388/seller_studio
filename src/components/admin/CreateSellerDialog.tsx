import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { addSellerRequest } from "@/redux/Admin/action";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Country, State } from "country-state-city";

interface CreateSellerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSellerCreated: () => void;
}

export function CreateSellerDialog({ open, onOpenChange, onSellerCreated }: CreateSellerDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    country: "",
    state: "",
    password: "",
  });
  const [skillInput, setSkillInput] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const [countryCode, setCountryCode] = useState<string>("");
  const [stateCode, setStateCode] = useState<string>("");

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      mobile: "",
      country: "",
      state: "",
      password: "",
    });
    setSelectedSkills([]);
    setSkillInput("");
    setCountryCode("");
    setStateCode("");
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const addSkillFromInput = () => {
    const s = skillInput.trim();
    if (!s) return;
    if (!selectedSkills.includes(s)) {
      setSelectedSkills(prev => [...prev, s]);
    }
    setSkillInput("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedSkills.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please select at least one skill",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Dispatch saga to call backend: POST /api/admin/sellers
      dispatch(addSellerRequest({
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        country: formData.country,
        state: formData.state,
        skills: selectedSkills,
        password: formData.password,
      } as any));

      toast({ title: "Success", description: "Seller created successfully" });
      resetForm();
      onOpenChange(false);
      onSellerCreated();
    } catch (error: any) {
      console.error("Error creating seller:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create seller",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Seller</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new seller account
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number *</Label>
                <Input
                  id="mobile"
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  minLength={6}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Country *</Label>
                <Select
                  value={countryCode}
                  onValueChange={(code) => {
                    const c = Country.getAllCountries().find(c => c.isoCode === code);
                    setCountryCode(code);
                    setStateCode("");
                    setFormData({ ...formData, country: c ? c.name : "", state: "" });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {Country.getAllCountries().map((c) => (
                      <SelectItem key={c.isoCode} value={c.isoCode}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>State *</Label>
                <Select
                  value={stateCode}
                  onValueChange={(code) => {
                    const s = State.getStatesOfCountry(countryCode).find(s => s.isoCode === code);
                    setStateCode(code);
                    setFormData({ ...formData, state: s ? s.name : formData.state });
                  }}
                  disabled={!countryCode}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={countryCode ? "Select state" : "Select country first"} />
                  </SelectTrigger>
                  <SelectContent>
                    {State.getStatesOfCountry(countryCode).map((s) => (
                      <SelectItem key={s.isoCode} value={s.isoCode}>{s.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Skills * (Enter and press Add)</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="e.g. React"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSkillFromInput(); } }}
                />
                <Button type="button" variant="secondary" onClick={addSkillFromInput}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedSkills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => toggleSkill(skill)}
                  >
                    {skill}
                    <X className="ml-1 h-3 w-3" />
                  </Badge>
                ))}
              </div>
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
                  Creating...
                </>
              ) : (
                "Create Seller"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}