import {
	Avatar,
	Button,
	Dropdown,
	Navbar,
	NavbarToggle,
	TextInput,
} from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice.js";
import { signoutSuccess } from "../redux/user/userSlice.js";

export default function Header() {
	const path = useLocation().pathname;
	const dispatch = useDispatch();
	const { currentUser } = useSelector((state) => state.user);
	const { theme } = useSelector((state) => state.theme);
	const handleSignout = async () => {
		try {
			const res = await fetch("/api/user/sign-out", {
				method: "POST",
			});
			const data = await res.json();
			if (!res.ok) {
				console.log(data.message);
			} else {
				dispatch(signoutSuccess());
			}
		} catch (err) {
			console.log(err.message);
		}
	};
	return (
		<Navbar className="border-b-2">
			<Link
				to={"/"}
				className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
			>
				<span className="px-2 py-1 mr-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
					MERN
				</span>
				BLOG
			</Link>
			<form>
				<TextInput
					type="text"
					placeholder="Search..."
					rightIcon={AiOutlineSearch}
					className="hidden lg:inline"
				/>
			</form>
			<Button className="w-12 h-10 lg:hidden" color="gray">
				<AiOutlineSearch />
			</Button>
			<div className="flex gap-2 md:order-2">
				<Button
					className="w-12 h-10 hidden sm:inline"
					color="gray"
					onClick={() => dispatch(toggleTheme())}
				>
					{theme === "light" ? (
						<FaMoon className="scale-150" />
					) : (
						<FaSun className="scale-150" />
					)}
				</Button>
				{currentUser ? (
					<Dropdown
						arrowIcon={false}
						inline
						label={
							<Avatar alt="user" img={currentUser.profilePicture} rounded />
						}
					>
						<Dropdown.Header>
							<span className="block text-sm">@{currentUser.username}</span>
							<span className="block text-sm font-medium truncate">
								{currentUser.email}
							</span>
						</Dropdown.Header>
						<Link to={"/dashboard?tab=profile"}>
							<Dropdown.Item>Profile</Dropdown.Item>
						</Link>
						<Dropdown.Divider />
						<Dropdown.Item onClick={handleSignout}>Sign Out</Dropdown.Item>
					</Dropdown>
				) : (
					<Link to={"/login"}>
						<Button gradientDuoTone="purpleToBlue" outline>
							Sign In
						</Button>
					</Link>
				)}
				<Navbar.Toggle />
			</div>
			<Navbar.Collapse>
				<Navbar.Link active={path === "/"} as={"span"}>
					<Link to={"/"}>Home</Link>
				</Navbar.Link>
				<Navbar.Link active={path === "/about"} as={"span"}>
					<Link to={"/about"}>About</Link>
				</Navbar.Link>
				<Navbar.Link active={path === "/projects"} as={"span"}>
					<Link to={"/projects"}>Projects</Link>
				</Navbar.Link>
			</Navbar.Collapse>
		</Navbar>
	);
}
