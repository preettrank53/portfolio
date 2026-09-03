import React from "react"
import { Skeleton } from "@/components/ui/skeleton"

export function SidebarSkeleton() {
  return (
    <div className="flex flex-col gap-6 md:gap-8 w-full" aria-busy="true">
      {/* Avatar icon */}
      <Skeleton className="w-20 h-20 md:w-24 md:h-24 rounded-[14px] md:rounded-xl" />

      {/* Display Name & Handle */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-10 md:h-12 w-3/4" />
        <Skeleton className="h-4 w-1/3" />
      </div>

      {/* Bio lines */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col gap-3 w-full">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>

      {/* Social Media Icons */}
      <div className="flex gap-6 items-center">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="w-6 h-6 md:w-5 md:h-5" />
        ))}
      </div>
    </div>
  )
}

export function FeedHeaderSkeleton() {
  return (
    <div className="flex items-center w-full min-h-[44px]" aria-busy="true">
      <div className="hidden md:block shrink-0 mr-auto pr-6">
        <Skeleton className="h-3 w-24" />
      </div>
      
      <div className="flex w-full md:w-auto items-center justify-between md:justify-end gap-2 md:gap-6">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-8 w-20 md:w-24 flex-1 md:flex-none" />
        ))}
      </div>
    </div>
  )
}

export function ExperienceCardSkeleton() {
  return (
    <div className="flex items-center gap-4 px-4 md:px-6 py-5 border-b border-[var(--theme-border)]" aria-busy="true">
      <Skeleton className="w-10 h-10 md:w-12 md:h-12 rounded-md shrink-0" />
      <div className="min-w-0 flex-1">
        <div className="flex flex-col md:flex-row items-baseline justify-between gap-1 md:gap-3 mb-1.5">
          <Skeleton className="h-4 w-32 md:w-48" />
          <Skeleton className="h-3 w-20" />
        </div>
        <div className="flex items-center justify-between">
          <Skeleton className="h-3.5 w-48 md:w-64" />
          <Skeleton className="h-3.5 w-8" />
        </div>
      </div>
    </div>
  )
}

export function ProjectCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 p-4 border border-[var(--theme-border)] rounded-md" aria-busy="true">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-12" />
        </div>
        <Skeleton className="h-6 w-3/4" />
      </div>
      <div className="flex-1 flex flex-col gap-1 mt-2">
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3.5 w-[90%]" />
        <Skeleton className="h-3.5 w-[80%]" />
      </div>
      <Skeleton className="w-full aspect-[16/9] rounded-md mt-4" />
      <div className="flex gap-2 mt-2">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-5 w-12" />
        ))}
      </div>
    </div>
  )
}

export function SkillsSkeleton() {
  return (
    <div className="flex flex-col w-full" aria-busy="true">
      {[1, 2].map((group) => (
        <div key={group} className="grid grid-cols-1 md:grid-cols-4 gap-4 px-4 md:px-6 py-6 border-b border-[var(--theme-border)] items-start">
          <div className="md:col-span-1">
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="md:col-span-3 flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-7 w-20 rounded-md" />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export function GithubChartSkeleton() {
  return (
    <div className="flex flex-col gap-2 mt-2" aria-busy="true">
      <div className="flex gap-1 overflow-hidden h-24">
        {Array.from({ length: 45 }).map((_, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-1">
            {Array.from({ length: 7 }).map((_, rowIndex) => (
              <Skeleton key={rowIndex} className="w-2.5 h-2.5" />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export function PrListSkeleton() {
  return (
    <div className="flex flex-col gap-2 mt-2" aria-busy="true">
      {[1, 2, 3].map((i) => (
        <div key={i} className="border border-[var(--theme-border)] p-2.5 bg-[var(--surface)]/30">
          <Skeleton className="h-2 w-24 mb-1.5" />
          <Skeleton className="h-3 w-3/4" />
        </div>
      ))}
    </div>
  )
}

export function ViewCounterSkeleton() {
  return (
    <div className="flex items-center gap-2 mt-8" aria-busy="true">
      <Skeleton className="h-3 w-32" />
    </div>
  )
}
