"use client";

import { useState, useRef, ReactNode, useEffect } from "react";
import { Trash2 } from "lucide-react";

interface SwipeableCardProps {
    children: ReactNode;
    onDelete: () => void;
}

const DELETE_THRESHOLD = 80; // px to reveal delete button
const FULL_SWIPE_THRESHOLD = 150; // px to trigger delete directly

export const SwipeableCard = ({ children, onDelete }: SwipeableCardProps) => {
    const [offsetX, setOffsetX] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const startXRef = useRef(0);
    const startYRef = useRef(0);
    const currentXRef = useRef(0);
    const isDraggingRef = useRef(false);
    const isHorizontalSwipeRef = useRef<boolean | null>(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const handleTouchMove = (e: TouchEvent) => {
            if (!isDraggingRef.current) return;

            const clientX = e.touches[0].clientX;
            const clientY = e.touches[0].clientY;
            const diffX = clientX - startXRef.current;
            const diffY = clientY - startYRef.current;

            // Determine if this is a horizontal or vertical swipe if not yet decided
            if (isHorizontalSwipeRef.current === null) {
                if (Math.abs(diffX) > 5 || Math.abs(diffY) > 5) {
                    isHorizontalSwipeRef.current = Math.abs(diffX) > Math.abs(diffY);
                }
            }

            // If it's a horizontal swipe, prevent default (scrolling) and update offset
            if (isHorizontalSwipeRef.current === true) {
                if (e.cancelable) e.preventDefault();

                if (diffX < 0) {
                    setOffsetX(Math.max(diffX, -FULL_SWIPE_THRESHOLD - 20));
                } else if (offsetX < 0) {
                    setOffsetX(Math.min(0, offsetX + diffX));
                    startXRef.current = clientX; // Keep tracking relative to return
                }
            }
        };

        const handleTouchStart = (e: TouchEvent) => {
            setIsTransitioning(false);
            isDraggingRef.current = true;
            isHorizontalSwipeRef.current = null;
            startXRef.current = e.touches[0].clientX;
            startYRef.current = e.touches[0].clientY;
            currentXRef.current = e.touches[0].clientX;
        };

        const handleTouchEnd = () => {
            if (!isDraggingRef.current) return;
            isDraggingRef.current = false;
            setIsTransitioning(true);

            if (offsetX < -FULL_SWIPE_THRESHOLD) {
                onDelete();
                setOffsetX(0);
            } else if (offsetX < -DELETE_THRESHOLD / 2) {
                setOffsetX(-DELETE_THRESHOLD);
            } else {
                setOffsetX(0);
            }
        };

        // Add non-passive touchmove listener
        el.addEventListener("touchstart", handleTouchStart);
        el.addEventListener("touchmove", handleTouchMove, { passive: false });
        el.addEventListener("touchend", handleTouchEnd);

        return () => {
            el.removeEventListener("touchstart", handleTouchStart);
            el.removeEventListener("touchmove", handleTouchMove);
            el.removeEventListener("touchend", handleTouchEnd);
        };
    }, [onDelete, offsetX]);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsTransitioning(false);
        isDraggingRef.current = true;
        startXRef.current = e.clientX;
        currentXRef.current = e.clientX;
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDraggingRef.current) return;
        const clientX = e.clientX;
        const diff = clientX - startXRef.current;
        if (diff < 0) {
            setOffsetX(Math.max(diff, -FULL_SWIPE_THRESHOLD - 20));
        } else if (offsetX < 0) {
            setOffsetX(Math.min(0, offsetX + diff));
            startXRef.current = clientX;
        }
    };

    const handleMouseUp = () => {
        if (!isDraggingRef.current) return;
        isDraggingRef.current = false;
        setIsTransitioning(true);
        if (offsetX < -DELETE_THRESHOLD / 2) {
            setOffsetX(-DELETE_THRESHOLD);
        } else {
            setOffsetX(0);
        }
    };

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete();
        setIsTransitioning(true);
        setOffsetX(0);
    };

    const resetSwipe = () => {
        if (offsetX !== 0) {
            setIsTransitioning(true);
            setOffsetX(0);
        }
    };

    return (
        <div className="relative overflow-hidden rounded-xl">
            <div
                className="absolute inset-y-0 right-0 w-20 bg-red-500 flex items-center justify-center cursor-pointer"
                onClick={handleDeleteClick}
            >
                <Trash2 className="w-6 h-6 text-white" />
            </div>

            <div
                ref={containerRef}
                className={`relative bg-white ${isTransitioning ? "transition-transform duration-200" : ""}`}
                style={{ transform: `translateX(${offsetX}px)` }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onClick={() => {
                    if (offsetX < 0) resetSwipe();
                }}
            >
                {children}
            </div>
        </div>
    );
};
