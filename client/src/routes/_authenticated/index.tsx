import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { WatchlistCard } from '@/components/WatchlistCard'
import { AnimeDialog } from '@/components/AnimeDialog'
import { EditAnimeDialog } from '@/components/EditAnimeDialog' // Import the EditDialog component
import { Anime } from '@/types/anime'
import { Watchlist } from '@server/types/watchlist'
import { api } from '@/lib/api'

export const Route = createFileRoute('/_authenticated/')({
  component: Index,
})

// Fetch watchlist data
const fetchWatchlist = async (userId: number): Promise<Watchlist[]> => {
  const res = await api.watchlist.$get({ query: { user_id: userId } })
  if (!res.ok) {
    throw new Error('Server error')
  }
  const data = await res.json()
  return data.watchlist
}

// Fetch anime details by ID
const fetchAnimeDetails = async (animeId: number): Promise<Anime> => {
  const res = await fetch(`https://api.jikan.moe/v4/anime/${animeId}`)
  const data = await res.json()
  return data.data
}

function Index() {
  const [animeInfo, setAnimeInfo] = useState<Anime | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false) // State for EditDialog
  const [selectedWatchlistItem, setSelectedWatchlistItem] =
    useState<Watchlist | null>(null) // Selected watchlist item to edit

  // Fetch watchlist using TanStack Query
  const { data: watchlist = [], isLoading: isWatchlistLoading } = useQuery({
    queryKey: ['watchlist', 1], // Replace `1` with dynamic user ID if needed
    queryFn: () => fetchWatchlist(1),
  })

  // Fetch anime details for all watchlist items
  const { data: animeData = [], isLoading: isAnimeLoading } = useQuery({
    queryKey: ['animeDetails', watchlist],
    queryFn: async () => {
      const animeDetails = await Promise.all(
        watchlist.map((item) =>
          fetchAnimeDetails(item.anime_id).then((anime) => ({
            ...anime,
            ...item,
          })),
        ),
      )
      return animeDetails
    },
    enabled: watchlist.length > 0,
  })

  const openDialog = (anime: Anime) => {
    setAnimeInfo(anime)
    setIsDialogOpen(true)
  }

  const closeDialog = () => {
    setAnimeInfo(null)
    setIsDialogOpen(false)
  }

  const openEditDialog = (watchlistItem: Watchlist) => {
    setSelectedWatchlistItem(watchlistItem)
    setIsEditDialogOpen(true)
  }

  const closeEditDialog = () => {
    setSelectedWatchlistItem(null)
    setIsEditDialogOpen(false)
  }

  const removeFromWatchlist = (id: number) => {
    console.log('Remove item:', id)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          Your Anime Watchlist
        </h1>
        {(isWatchlistLoading || isAnimeLoading) && (
          <div className="flex justify-center items-center col-span-full h-[50vh]">
            <p className="text-center text-muted-foreground">Loading...</p>
          </div>
        )}
        {!isWatchlistLoading && !isAnimeLoading && animeData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {animeData.map((anime) => (
              <WatchlistCard
                key={anime.mal_id}
                anime={anime}
                onRemove={removeFromWatchlist}
                onOpenDialog={openDialog}
                onEdit={() => {
                  const watchlistItem = watchlist.find(
                    (item) => item.anime_id === anime.mal_id,
                  )
                  if (watchlistItem) openEditDialog(watchlistItem)
                }}
              />
            ))}
          </div>
        ) : (
          !isWatchlistLoading &&
          !isAnimeLoading && (
            <p className="text-center text-muted-foreground">
              No anime found in your watchlist. Add some to get started!
            </p>
          )
        )}
      </div>
      <AnimeDialog
        animeInfo={animeInfo}
        isOpen={isDialogOpen}
        onClose={closeDialog}
        onAddToWatchlist={() => console.log('Added to Watchlist')}
      />
      <EditAnimeDialog
        isOpen={isEditDialogOpen}
        onClose={closeEditDialog}
        onSubmit={(formData) => {
          console.log('Updated data:', {
            ...selectedWatchlistItem,
            ...formData,
          })
          closeEditDialog()
        }}
      />
    </div>
  )
}

export default Index
