import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const SellerLayout = () => {
  const { isSeller, setIsSeller } = useContext(AppContext);
  const navigate = useNavigate();

  const sidebarLinks = [
    { name: "Add Produce", path: "/seller", icon: assets.add_icon },
    { name: "Product List", path: "/seller/product-list", icon: assets.product_list_icon },
    { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
  ];

  return (
    <>
      {/* Top Navbar */}
      <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
        <h1 className="text-2xl text-orange-600">Grocery App</h1>
        <div className="flex items-center gap-5 text-gray-500">
          <p>Hi! Admin</p>
          <button
            onClick={() => {
              setIsSeller(false);
              navigate("/");
            }}
            className="border rounded-full text-sm px-4 py-1"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Sidebar and Outlet container */}
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="md:w-64 w-16 border-r text-base border-gray-300 pt-4 flex flex-col bg-white transition-all duration-300">
          <nav className="space-y-1">
            {sidebarLinks.map((item) => (
              <NavLink
                to={item.path}
                key={item.name}
                end={item.path === "/seller"}
                className={({ isActive }) =>
                  `flex items-center py-3 px-4 gap-3 transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "border-r-4 border-indigo-600 bg-indigo-50 text-indigo-600"
                      : "hover:bg-gray-100 border-transparent text-gray-600"
                  }`
                }
              >
                <img src={item.icon} alt={item.name} className="w-6 h-6" />
                <p className="md:block hidden text-sm">{item.name}</p>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 p-4 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default SellerLayout;
