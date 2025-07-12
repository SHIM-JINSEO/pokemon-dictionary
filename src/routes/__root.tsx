import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import PokemonLogo from "../assets/image.png";
export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{" "}
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
      </div>
      <hr />
      <div className="flex justify-center items-center my-[20px]">
        <img src={PokemonLogo} alt="Pokemon Logo" />
      </div>

      <div className="flex flex-wrap items-center mx-[200px] my-[40px]">
        <Outlet />
      </div>

      <TanStackRouterDevtools />
    </>
  ),
});
