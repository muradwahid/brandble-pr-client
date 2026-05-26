import { useState, useEffect, useRef, useCallback } from "react";
const InfiniteScroll = ({
  onLoadMore,
  threshold = 0.1,
  rootMargin = "0px 0px 200px 0px",
  data,
  children,
}) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  // Sentinel element observed by IntersectionObserver
  const sentinelRef = useRef(null);
  // Guard against concurrent fetches
  const loadingRef = useRef(false);
  // Track the *next* page to fetch so the observer closure is always current
  const pageRef = useRef(0);

  const load = useCallback(async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const nextPage = pageRef.current + 1;
      const result = await onLoadMore(nextPage);
      pageRef.current = nextPage;
      setPage(nextPage);
      setItems((prev) => [...prev, ...(result.items ?? [])]);
      setHasMore(result.hasMore ?? false);
    } catch (err) {
      setError(err);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, [onLoadMore]);

  /** Reset state and restart from page 0 */
  const reset = useCallback(() => {
    setItems([]);
    setPage(0);
    setHasMore(true);
    setError(null);
    pageRef.current = 0;
    loadingRef.current = false;
  }, []);

  // Attach IntersectionObserver to sentinel
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loadingRef.current) {
          load();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [load, threshold, rootMargin]);

  // Re-attach observer whenever hasMore changes (after a successful load
  // the sentinel may already be visible, so we trigger another check)
  useEffect(() => {
    if (!hasMore) return;
    const sentinel = sentinelRef.current;
    if (!sentinel || loadingRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loadingRef.current) {
          load();
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [items.length, hasMore, load, threshold, rootMargin]);

  return (
    <>
      {children({ items,data ,page, loading, hasMore, error, reset })}

      {/* Invisible sentinel — when it enters the viewport the next page loads */}
      {hasMore && (
        <div
          ref={sentinelRef}
          aria-hidden="true"
          className="w-full h-[1px]"
        />
      )}
    </>
  );
}

export default InfiniteScroll;


/* ─────────────────────────────────────────────────────────────
   DEMO  –  delete everything below when using in your project
   ───────────────────────────────────────────────────────────── */

/** Fake API: returns 10 items per page, stops after page 5 */
async function fakeApi(page) {
  await new Promise((r) => setTimeout(r, 800));
  const TOTAL_PAGES = 5;
  const items = Array.from({ length: 10 }, (_, i) => ({
    id: (page - 1) * 10 + i + 1,
    title: `Item #${(page - 1) * 10 + i + 1}`,
    subtitle: `Page ${page} · slot ${i + 1}`,
  }));
  return { items, hasMore: page < TOTAL_PAGES };
}

function Spinner() {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
      <div
        style={{
          width: 32,
          height: 32,
          border: "3px solid #e2e8f0",
          borderTop: "3px solid #6366f1",
          borderRadius: "50%",
          animation: "spin 0.7s linear infinite",
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function Card({ id, title, subtitle }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e2e8f0",
        borderRadius: 12,
        padding: "1rem 1.25rem",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        transition: "box-shadow 0.2s",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow = "0 4px 14px rgba(99,102,241,.15)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: `hsl(${(id * 37) % 360}, 65%, 60%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontWeight: 700,
          fontSize: 14,
          flexShrink: 0,
        }}
      >
        {id}
      </div>
      <div>
        <div style={{ fontWeight: 600, color: "#1e293b", fontSize: 15 }}>
          {title}
        </div>
        <div style={{ color: "#94a3b8", fontSize: 13, marginTop: 2 }}>
          {subtitle}
        </div>
      </div>
    </div>
  );
}

export function Demo() {
  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        background: "#f8fafc",
        minHeight: "100vh",
        padding: "2rem 1rem",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700&display=swap"
        rel="stylesheet"
      />

      <div style={{ maxWidth: 520, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "2rem", textAlign: "center" }}>
          <h1
            style={{
              fontSize: 26,
              fontWeight: 700,
              color: "#1e293b",
              margin: 0,
            }}
          >
            InfiniteScroll
          </h1>
          <p style={{ color: "#64748b", marginTop: 6, fontSize: 15 }}>
            Scroll down to load more items
          </p>
        </div>

        {/* The component in action */}
        <InfiniteScroll onLoadMore={fakeApi}>
          {({ items, loading, hasMore, error, reset, page }) => (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {/* Stats bar */}
              {items.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0.5rem 0",
                    marginBottom: 4,
                  }}
                >
                  <span style={{ color: "#64748b", fontSize: 13 }}>
                    {items.length} items loaded · page {page}
                  </span>
                  <button
                    onClick={reset}
                    style={{
                      background: "none",
                      border: "1px solid #e2e8f0",
                      borderRadius: 8,
                      padding: "4px 12px",
                      fontSize: 12,
                      color: "#6366f1",
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    Reset
                  </button>
                </div>
              )}

              {/* Item cards */}
              {items.map((item) => (
                <Card key={item.id} {...item} />
              ))}

              {/* States */}
              {loading && <Spinner />}

              {error && (
                <div
                  style={{
                    textAlign: "center",
                    color: "#ef4444",
                    padding: "1rem",
                    background: "#fef2f2",
                    borderRadius: 10,
                    fontSize: 14,
                  }}
                >
                  {error.message}
                </div>
              )}

              {!hasMore && !loading && items.length > 0 && (
                <div
                  style={{
                    textAlign: "center",
                    color: "#94a3b8",
                    fontSize: 13,
                    padding: "1.5rem 0 0.5rem",
                  }}
                >
                  ✦ You've reached the end ✦
                </div>
              )}
            </div>
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
}