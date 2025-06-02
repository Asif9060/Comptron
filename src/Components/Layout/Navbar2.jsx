import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { userAuth } from "../../USER/FirebaseUser";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import male from "../../assets/images/male.jpg";
import female from "../../assets/images/female.jpg";

const navigation = [
  { name: "Home", href: "/", current: false },
  { name: "Committee", href: "/Committee", current: true },
  { name: "Events", href: "/Events", current: false },
  { name: "Members", href: "/GMembers", current: false },
  { name: "About Us", href: "/About", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [user] = useAuthState(userAuth);
  const [customUser, setCustomUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.email) {
        try {
          const res = await fetch(
            `https://comptron-server-2.onrender.com/api/users/getByEmail/${user.email}`
          );
          const data = await res.json();
          if (res.ok) {
            setCustomUser(data);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [user]);

  return (
    <Disclosure
      as="nav"
      className="bg-[#483D68] border border-gray-800 border-l-0 border-r-0 mt-8"
    >
      <div className="mx-auto  max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Hamburger menu (mobile only) */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-[#15A6E1] hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>

          {/* Centered nav + profile */}
          <div className="flex flex-1 z-20 items-center justify-center sm:justify-center">
            <div className="hidden sm:flex space-x-10">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  aria-current={item.current ? "page" : undefined}
                  className={classNames(
                    item.current
                      ? "bg-[#15A6E1] text-white "
                      : "text-white transition duration-300 ease-in-out hover:bg-[#15A6E1] hover:text-white",
                    "rounded-md px-3 py-2 text-sm font-medium"
                  )}
                >
                  {item.name}
                </a>
              ))}

              {/* <img
                className="h-10 w-10 aspect-square rounded-full object-cover border-2 border-[#15A6E1]"
                src={
                  customUser?.image ||
                  user.photoURL ||
                  `https://ui-avatars.com/api/?name=${user.displayName || 'User'}&background=15A6E1&color=fff`
                }
                alt="User profile"
              /> */}
              {/* Login/Profile section */}
              {user ? (
                <Menu as="div" className="relative">
                  <div>
                    <MenuButton className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-white">
                      <img
                        src={
                          customUser?.image ||
                          user?.photoURL ||
                          (customUser?.gender?.toLowerCase() === "female"
                            ? female
                            : male)
                        }
                        alt="User profile"
                        className="h-10 w-10 cursor-pointer aspect-square rounded-full object-cover border-2 border-[#15A6E1]"
                        onError={(e) => {
                          e.target.src =
                            customUser?.gender?.toLowerCase() === "female"
                              ? female
                              : male;
                        }}
                      />
                    </MenuButton>
                  </div>
                  <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <MenuItem>
                      {({ active }) => (
                        <a
                          href={`/profile/${customUser?.customId || ""}`}
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Profile
                        </a>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ active }) => (
                        <button
                          onClick={() => signOut(userAuth)}
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block w-full text-left px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Sign out
                        </button>
                      )}
                    </MenuItem>
                  </MenuItems>
                </Menu>
              ) : (
                <NavLink
                  to="/UserLogin"
                  className="text-white bg-[#15A6E1] hover:bg-[#1392c8] px-4 py-2 rounded-md text-sm font-medium transition"
                >
                  Login / Register
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Panel */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-[#15A6E1] text-white"
                  : "text-white transition duration-250 ease-in-out hover:bg-[#15A6E1] hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}

          {/* Mobile login/profile */}
          {user ? (
            <DisclosureButton
              as="button"
              onClick={() => signOut(auth)}
              className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-white hover:bg-[#15A6E1]"
            >
              Sign Out
            </DisclosureButton>
          ) : (
            <a
              href="/UserLogin"
              className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-[#15A6E1]"
            >
              Login / Register
            </a>
          )}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
