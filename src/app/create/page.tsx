"use client";

import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
// 컴포넌트
import LabelCalendar from "@/components/common/calendar/LabelCalendar";
import BasicBoard from "@/components/common/board/BasicBoard";
import styles from "./page.module.scss";

function CreatePage() {
    const [progress, setProgress] = useState(13);

    useEffect(() => {
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
                            <span className={styles.progressBar__status}>6/10 completed</span>
                            {/* 프로그레스바 UI */}
                            <Progress value={progress} className="w-[30%] h-2" indicatorColor="bg-green-400" />
                        </div>
                        <div className={styles.calendarBox}>
                            <div className={styles.calendarBox__calendar}>
                                {/* 캘린더 UI */}
                                <LabelCalendar label="From" />
                                <LabelCalendar label="To" />
                            </div>
                            <Button variant="outline" className="w-[15%] border-orange-500 bg-orange-400 text-white hover:bg-orange-300">
                                Add New Board
                            </Button>
                        </div>
                    </div>
                </header>
                <main className={styles.container__body}>
                    {/* <div className={styles.container__body__infoBox}>
                    <span className={styles.title}>There is no board yet.</span>
                    <span className={styles.subTitle}>Click the button and start flashing!</span>
                    <button className={styles.button}>
                        <Image src="/round-button.svg" alt="round-button" width={100} height={100} />
                    </button>
                </div> */}
                    <div className={styles.container__body__isBoard}>
                        <BasicBoard />
                    </div>
                </main>
            </div>
        </>
    );
}

export default CreatePage;
