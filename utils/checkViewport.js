export const isDesktonViewport = (page) => {
    const size = page.viewportSize()
    return size.width >= 600
}