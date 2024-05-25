import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

import styles from "./SideNavigation.module.scss";

function SideNavigation() {
    return (
        <div className={styles.container}>
            {/* 검색창 */}
            <div className={styles.container__searchBox}>
                <Input type="text" placeholder="Search" className="focus-visible:ring-0" />
                <Button variant="outline" size="icon">
                    <Search className="h-4 w-4" />
                </Button>
            </div>
            {/* 페이지 추가 버튼 */}
            <div className={styles.container__buttonBox}>
                <Button variant="outline" className="w-full text-orange-500 border-orange-400 hover:bg-orange-50 hover:text-orange-500">
                    Add New Page
                </Button>
            </div>
        </div>
    );
}

export default SideNavigation;
