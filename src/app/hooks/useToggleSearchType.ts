export type searchTypeProps = "title" | "category" | "author";
export type setSearchTypeProps = (val: searchTypeProps) => void

export default function useToggleSearchType(){
    const handleToggleSearchType = ( searchType: searchTypeProps, setSearchType: setSearchTypeProps) => {
        if (searchType === "title") {
            setSearchType("category")
            return
        }
        if (searchType === "category") {
            setSearchType("author")
            return
        }
        setSearchType("title")
    }

    return { handleToggleSearchType }
}