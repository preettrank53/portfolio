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
    <div className="border-b border-[var(--border)] py-6 md:py-10 flex flex-col rounded-none group relative overflow-hidden" aria-busy="true">
      <Skeleton className="h-2 w-32 mb-4" />
      
      <div className="flex flex-row gap-4 items-start mb-4">
        <Skeleton className="w-12 h-12 md:w-14 md:h-14 rounded-md shrink-0" />
        <div className="flex-1 flex flex-col gap-2 min-w-0 pt-1">
          <Skeleton className="h-6 md:h-7 w-2/3 md:w-1/2" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      </div>
      
      <div className="flex flex-col gap-2 mt-2 mb-6">
        <Skeleton className="h-4 w-[95%]" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[85%]" />
      </div>
      
      <div className="flex gap-2">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-6 w-16" />
        ))}
      </div>
    </div>
  )
}

export function ProjectCardSkeleton() {
  return (
    <div className="border-b border-[var(--border)] py-6 md:py-10 flex flex-col rounded-none group relative overflow-hidden" aria-busy="true">
      <Skeleton className="h-2 w-32 mb-4" />
      
      <div className="flex flex-col gap-3 mb-6">
        <Skeleton className="h-7 md:h-8 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      
      <Skeleton className="w-full aspect-video mb-6 rounded-md" />
      
      <div className="flex gap-2">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-6 w-14" />
        ))}
      </div>
    </div>
  )
}

export function SkillsSkeleton() {
  return (
    <div className="flex flex-col w-full" aria-busy="true">
      {[1, 2].map((group) => (
        <div key={group} className="border-b border-[var(--border)] py-6 md:py-10 flex flex-col rounded-none group relative overflow-hidden">
          <Skeleton className="h-6 md:h-8 w-2/3 md:w-1/2 mb-3" />
          <Skeleton className="h-4 w-3/4 md:w-1/3 mb-6" />
          
          <div className="flex flex-wrap gap-3">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <Skeleton key={i} className="w-[60px] h-[60px] md:w-[70px] md:h-[70px] rounded-md" />
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
        <div key={i} className="border border-[var(--border)] p-2.5 bg-[var(--surface)]/30">
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
