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
    <div className="mb-12 relative flex flex-col md:flex-row group" aria-busy="true">
      <div className="hidden md:block w-32 shrink-0 pt-1 pr-6">
        <Skeleton className="h-3 w-20 mb-2" />
        <Skeleton className="h-2 w-16" />
      </div>
      
      <div className="flex-1 min-w-0 border border-[var(--border)] p-5 md:p-6 bg-[var(--surface)]/30">
        <div className="flex items-start gap-4 mb-4">
          <Skeleton className="w-10 h-10 shrink-0" />
          <div className="flex flex-col gap-2 flex-1">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-3 w-1/4" />
          </div>
        </div>
        
        <div className="flex flex-col gap-2 mt-6 mb-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[95%]" />
          <Skeleton className="h-4 w-[90%]" />
        </div>
        
        <div className="flex gap-2 mt-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-6 w-16" />
          ))}
        </div>
      </div>
    </div>
  )
}

export function ProjectCardSkeleton() {
  return (
    <div className="mb-12 relative flex flex-col md:flex-row group" aria-busy="true">
      <div className="hidden md:block w-32 shrink-0 pt-1 pr-6">
        <Skeleton className="h-3 w-20 mb-2" />
        <Skeleton className="h-2 w-16" />
      </div>
      
      <div className="flex-1 min-w-0 border border-[var(--border)] p-5 md:p-6 bg-[var(--surface)]/30">
        <div className="flex flex-col gap-2 mb-4">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        
        <div className="flex flex-col gap-2 mt-4 mb-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[90%]" />
        </div>

        <Skeleton className="w-full aspect-video mt-4 mb-4" />
        
        <div className="flex gap-2 mt-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-6 w-14" />
          ))}
        </div>
      </div>
    </div>
  )
}

export function SkillsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6" aria-busy="true">
      {[1, 2].map((group) => (
        <div key={group} className="border border-[var(--border)] p-5 md:p-6 bg-[var(--surface)]/30">
          <Skeleton className="h-5 w-1/2 mb-4" />
          
          <div className="flex flex-wrap gap-2 mt-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Skeleton key={i} className="w-10 h-10" />
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
