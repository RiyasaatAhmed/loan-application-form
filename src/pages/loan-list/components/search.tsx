import type { ReactElement } from "react";
import { Button, FormField, Input } from "@salt-ds/core";
import { SearchIcon, CloseIcon } from "@salt-ds/icons";
import { useEffect, useState } from "react";
import { useQueryParams } from "../../../hooks/use-query-params";
import { useDebounce } from "../../../hooks/use-debounce";
import { DEFAULT_EMPTY_STRING } from "../../../statics/constants";
import { sanitizeSearchInput } from "../../../utils/security-sanitization";

/** Search component with debounced input and clear functionality */
export function Search(): ReactElement {
  const { getParam, updateQuery } = useQueryParams();
  const currentSearch = getParam("name");
  const [searchInput, setSearchInput] = useState(
    currentSearch || DEFAULT_EMPTY_STRING
  );
  const debouncedSearch = useDebounce(searchInput, 500);

  const handleClear = () => {
    setSearchInput(DEFAULT_EMPTY_STRING);
  };

  // Update URL query when debounced search changes
  useEffect(() => {
    if (debouncedSearch !== currentSearch) {
      updateQuery({ name: debouncedSearch });
    }
  }, [currentSearch, debouncedSearch, updateQuery]);

  return (
    <FormField id="name">
      <Input
        startAdornment={<SearchIcon />}
        placeholder="Search by name..."
        value={searchInput}
        variant="primary"
        inputProps={{ name: "name" }}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const sanitized = sanitizeSearchInput(e.target.value);
          setSearchInput(sanitized);
        }}
        endAdornment={
          searchInput && (
            <Button appearance="transparent" onClick={handleClear}>
              <CloseIcon />
            </Button>
          )
        }
      />
    </FormField>
  );
}
