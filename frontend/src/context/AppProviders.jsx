import { AuthProvider } from "./AuthContext";
import { BookmarkProvider } from "./BookmarkContext";
import { FilterProvider } from "./FilterContext";
import { ThemeProvider } from "./ThemeContext";

export function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BookmarkProvider>
          <FilterProvider>{children}</FilterProvider>
        </BookmarkProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
