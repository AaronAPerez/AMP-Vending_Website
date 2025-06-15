export const Loading = () => {
    return (
      <>
      <div className="bg-[#000000] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FD5A1E]"></div>
          <p className="mt-4 text-[#F5F5F5]">Loading vending machine information...</p>
        </div>
      </div>
      </>
    );
  }