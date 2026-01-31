"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  FileText, 
  Lightbulb, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Lock,
  Sparkles,
  Mic
} from "lucide-react";

const navItems = [
  { 
    label: "Dashboard", 
    href: "/dashboard", 
    icon: LayoutDashboard,
    locked: false 
  },
  { 
    label: "Profile Refactor", 
    href: "/dashboard/refactor", 
    icon: Sparkles,
    locked: false 
  },
  { 
    label: "Voice & Intent", 
    href: "/dashboard/voice", 
    icon: Mic,
    locked: false 
  },
  { 
    label: "Create Post", 
    href: "/dashboard/posts", 
    icon: FileText,
    locked: false 
  },
  { 
    label: "Insights", 
    href: "/dashboard/insights", 
    icon: Lightbulb,
    locked: false
  },
  { 
    label: "Settings", 
    href: "/dashboard/settings", 
    icon: Settings,
    locked: false 
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    // Check if onboarding is complete
    const onboardingComplete = localStorage.getItem("olis_onboarding_complete") === "true";
    if (!onboardingComplete) {
      router.push("/onboarding");
      return;
    }

    // Get user name from profile data
    const profileData = localStorage.getItem("olis_profile_data");
    if (profileData) {
      try {
        const parsed = JSON.parse(profileData);
        if (parsed.fullName) {
          setUserName(parsed.fullName.split(" ")[0]);
        }
      } catch {
        // Ignore parse errors
      }
    }
  }, [router]);

  const handleLogout = () => {
    // Clear all OLIS data
    localStorage.removeItem("olis_current_step");
    localStorage.removeItem("olis_profile_data");
    localStorage.removeItem("olis_posts_data");
    localStorage.removeItem("olis_onboarding_complete");
    router.push("/onboarding");
  };

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside 
        className={`${
          isCollapsed ? "w-16" : "w-64"
        } bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
          {!isCollapsed && (
            <span className="text-xl font-semibold text-gray-900">OLIS</span>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 w-8"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            
            return (
              <button
                key={item.href}
                onClick={() => !item.locked && router.push(item.href)}
                disabled={item.locked}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-gray-900 text-white"
                    : item.locked
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                } ${isCollapsed ? "justify-center" : ""}`}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && (
                  <>
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.locked && (
                      <Lock className="h-3.5 w-3.5 text-gray-400" />
                    )}
                  </>
                )}
              </button>
            );
          })}
        </nav>

        {/* User section */}
        <div className="p-3 border-t border-gray-100">
          <div className={`flex items-center gap-3 px-3 py-2 ${isCollapsed ? "justify-center" : ""}`}>
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-medium text-gray-600">
                {userName.charAt(0).toUpperCase()}
              </span>
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{userName}</p>
              </div>
            )}
          </div>
          
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors mt-1 ${
              isCollapsed ? "justify-center" : ""
            }`}
            title={isCollapsed ? "Start Over" : undefined}
          >
            <LogOut className="h-5 w-5" />
            {!isCollapsed && <span>Start Over</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
