import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/rootStore";
import { Users, UserPlus, Package, LayoutDashboard, ChevronDown, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

interface NavItem {
  label: string;
  to: string;
  icon?: React.ComponentType<any>;
}

function classNames(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function Sidebar() {
  const adminUser = useSelector((s: RootState) => s.login.admin.user);
  const sellerUser = useSelector((s: RootState) => s.login.seller.user);
  const role = adminUser?.role || sellerUser?.role || (typeof localStorage !== 'undefined' ? localStorage.getItem('authRole') : null);

  // Collapsible demo section (like "Spaces" in the reference)
  const [openSection, setOpenSection] = useState(true);
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    if (typeof localStorage === 'undefined') return false;
    const stored = localStorage.getItem('sidebarCollapsed');
    return stored === '1';
  });

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('sidebarCollapsed', collapsed ? '1' : '0');
    }
  }, [collapsed]);

  let mainItems: NavItem[] = [];
  let sectionTitle = "";
  let sectionItems: NavItem[] = [];

  if (role === "admin") {
    mainItems = [
      { label: "Home", to: "/admin/dashboard", icon: LayoutDashboard },
    ];
    sectionTitle = "Management";
    sectionItems = [
      { label: "Sellers", to: "/admin/dashboard", icon: Users },
      { label: "Create Seller", to: "/admin/dashboard#create", icon: UserPlus },
    ];
  } else if (role === "seller") {
    mainItems = [
      { label: "Home", to: "/seller/dashboard", icon: LayoutDashboard },
    ];
    sectionTitle = "Catalog";
    sectionItems = [
      { label: "Products", to: "/seller/dashboard", icon: Package },
    ];
  }

  return (
    <aside className={
      `hidden md:flex ${collapsed ? 'w-16' : 'md:w-64'} md:flex-col border-r bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60`
    }>
      {/* Brand + Toggle */}
      <div className="h-16 flex items-center justify-between px-3 border-b">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="h-8 w-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold">S</div>
          {!collapsed && <div className="font-semibold truncate">Seller Sync Studio</div>}
        </div>
        <button
          type="button"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          onClick={() => setCollapsed(v => !v)}
          className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted"
          title={collapsed ? 'Expand' : 'Collapse'}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeftIcon />}
        </button>
      </div>

      <div className="flex-1 p-3 space-y-6">
        {/* Main */}
        <div>
          {!collapsed && (
            <div className="px-2 text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Main</div>
          )}
          <nav className="space-y-1">
            {mainItems.map(({ label, to, icon: Icon }) => (
              <div key={to} className="relative group">
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    classNames(
                      "flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition-colors border border-transparent",
                      isActive
                        ? "bg-primary/10 text-primary border-primary/20"
                        : "hover:bg-muted"
                    )
                  }
                  title={collapsed ? label : undefined}
                >
                  {Icon ? <Icon className="h-4 w-4" /> : null}
                  {!collapsed && <span>{label}</span>}
                </NavLink>
                {collapsed && (
                  <div className="pointer-events-none absolute left-14 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border bg-popover px-2 py-1 text-xs shadow opacity-0 transition-opacity group-hover:opacity-100">
                    {label}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Collapsible section */}
        {sectionItems.length > 0 && (
          <div>
            {!collapsed && (
              <button
                type="button"
                onClick={() => setOpenSection(v => !v)}
                className="w-full flex items-center justify-between px-2 text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2"
              >
                <span>{sectionTitle}</span>
                {openSection ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
              </button>
            )}
            {openSection && (
              <nav className="space-y-1">
                {sectionItems.map(({ label, to, icon: Icon }) => (
                  <div key={to} className="relative group">
                    <NavLink
                      to={to}
                      className={({ isActive }) =>
                        classNames(
                          "flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition-colors border border-transparent",
                          isActive
                            ? "bg-primary/10 text-primary border-primary/20"
                            : "hover:bg-muted"
                        )
                      }
                      title={collapsed ? label : undefined}
                    >
                      {Icon ? <Icon className="h-4 w-4" /> : null}
                      {!collapsed && <span>{label}</span>}
                    </NavLink>
                    {collapsed && (
                      <div className="pointer-events-none absolute left-14 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border bg-popover px-2 py-1 text-xs shadow opacity-0 transition-opacity group-hover:opacity-100">
                        {label}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}

// Small left chevron icon composed from lucide to avoid importing another icon
function ChevronLeftIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><polyline points="15 18 9 12 15 6"></polyline></svg>;
}
