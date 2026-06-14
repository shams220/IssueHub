import { AuthProvider } from "./AuthContext";
import { BookmarkProvider } from "./BookmarkContext";
import { FilterProvider } from "./FilterContext";
import { ThemeProvider } from "./ThemeContext";
import { ProgressProvider } from "./ProgressContext";

export function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BookmarkProvider>
          <ProgressProvider>
            <FilterProvider>{children}</FilterProvider>
          </ProgressProvider>
        </BookmarkProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
