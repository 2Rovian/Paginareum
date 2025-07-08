import NavbarComp from "@/app/components/layout/(Navbar)/Navbar";

export default async function OtherBooksFromAuthor({ params }: { params: { book_author: string } }) {
    const { book_author } = await params;
    const decodedAuthor = decodeURIComponent(book_author);

    const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=inauthor:${decodedAuthor}&maxResults=30`
    )

    const data = await response.json()
    console.log(data)

    const booksData = data.items
    return (
        <>
            <NavbarComp />
            <div className="max-w-7xl mx-auto px-4 xl:px-0 pb-12" >
                <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-2">
                    {booksData.map((book: any) => (
                        <p>{book.volumeInfo.title}</p>
                    ))}
                </main>
            </div>
        </>

    )
}