import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiLogout, HiUser } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

export default function DashboardSidebar() {
	const location = useLocation();
	const [tab, setTab] = useState("");
	useEffect(() => {
		const urlParams = new URLSearchParams(location.search);
		const tabFromUrl = urlParams.get("tab");
		if (tabFromUrl) {
			setTab(tabFromUrl);
		}
	}, [location.search]);
	return (
		<Sidebar className="w-full md:w-56">
			<Sidebar.Items>
				<Sidebar.ItemGroup>
					<Link to="/dashboard?tab=profile">
						<Sidebar.Item
							active={tab === "profile"}
							icon={HiUser}
							label={"User"}
							labelColor="dark"
							as="span"
						>
							Profile
						</Sidebar.Item>
					</Link>
					<Sidebar.Item icon={HiLogout} className="cursor-pointer">
						Log Out
					</Sidebar.Item>
				</Sidebar.ItemGroup>
			</Sidebar.Items>
		</Sidebar>
	);
}
