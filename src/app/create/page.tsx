"use client";

import { supabaseAdmin } from "@/lib/supabase";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
// 컴포넌트
import LabelCalendar from "@/components/common/calendar/LabelCalendar";
import BasicBoard from "@/components/common/board/BasicBoard";
import styles from "./page.module.scss";

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

function CreatePage() {
    // 헤더 데이터
    const [progress, setProgress] = useState<number>(0);
    const [startDate, setStartDate] = useState<Date | undefined>();
    const [endDate, setEndDate] = useState<Date | undefined>();

    const setDate = (payload: { label: string; date: Date | undefined }) => {
        if (payload.label === "From") setStartDate(payload.date);
        else setEndDate(payload.date);
    };

    // ====================================================================================================

    const init: Todo = {
        id: 0,
        created_at: new Date(),
        board_contents: {
            title: "",
            startDate: new Date(),
            endDate: new Date(),
            contents: "",
        },
    };
    const createBoard = () => {
        let newBoards = [...todos];
        newBoards.push(init);
        setTodos(newBoards);
    };

    // 보드 데이터
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

    // ====================================================================================================

    useEffect(() => {
        fetchData();

        const timer = setTimeout(() => setProgress(66), 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <div className={styles.container}>
                <header className={styles.container__header}>
                    <div className={styles.container__header__contents}>
                        <input type="text" placeholder="Enter Title Here" className={styles.input} />
                        <div className={styles.progressBar}>
                            <span className={styles.progressBar__status}>0/{todos.length} completed</span>
                            {/* 프로그레스바 UI */}
                            <Progress value={progress} className="w-[30%] h-2" indicatorColor="bg-green-400" />
                        </div>
                        <div className={styles.calendarBox}>
                            <div className={styles.calendarBox__calendar}>
                                {/* 캘린더 UI */}
                                <LabelCalendar label="From" handleDate={setDate} />
                                <LabelCalendar label="To" handleDate={setDate} />
                            </div>
                            <Button
                                variant="outline"
                                className="w-[15%] border-orange-500 bg-orange-400 text-white hover:bg-oragne-400 hover:text-white"
                                onClick={createBoard}
                            >
                                Add New Board
                            </Button>
                        </div>
                    </div>
                </header>
                <main className={styles.container__body}>
                    {todos.length === 0 ? (
                        <div className={styles.container__body__infoBox}>
                            <span className={styles.title}>There is no board yet.</span>
                            <span className={styles.subTitle}>Click the button and start flashing!</span>
                            <button className={styles.button} onClick={createBoard}>
                                <Image src="/round-button.svg" alt="round-button" width={100} height={100} />
                            </button>
                        </div>
                    ) : (
                        <div className={styles.container__body__isBoard}>
                            {todos.map((item: Todo, index: number) => {
                                return <BasicBoard key={index} data={item.board_contents} />;
                            })}
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}

export default CreatePage;
