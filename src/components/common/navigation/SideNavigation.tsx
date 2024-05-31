"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

import styles from "./SideNavigation.module.scss";
import { useEffect, useState } from "react";
import { supabaseAdmin } from "@/lib/supabase";

interface Todo {
    id: number;
    created_at: Date;
    board_contents: {
        title: string;
        startDate: Date | undefined;
        endDate: Date | undefined;
        contents: string;
    };
}

function SideNavigation() {
    const [todos, setTodos] = useState<any>([]);

    const fetchData = async () => {
        try {
            let { data: views, error } = await supabaseAdmin.from("views").select("*");
            setTodos(views);
            console.log(views);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

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
            <div className={styles.container__todos}>
                <span className={styles.container__todos__label}>Your To do</span>
                {todos.map((item: Todo) => {
                    return (
                        <div className={styles.container__todos__todo} key={item.id}>
                            <div className={styles.titleBox}>
                                <div className={styles.titleBox__dot}></div>
                                <span className={styles.titleBox__title}>{item.board_contents.title}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default SideNavigation;
