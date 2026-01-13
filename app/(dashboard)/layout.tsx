import { DashboardNav } from "@/components"
import { currentUser } from "@/data/dummy.general"

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
    const user = currentUser

    return (
        <DashboardNav user={user}>
            {children}
        </DashboardNav>
    )
}

export default DashboardLayout