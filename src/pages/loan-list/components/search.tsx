import { Button, FormField, Input } from "@salt-ds/core";
import { SearchIcon, CloseIcon } from "@salt-ds/icons";
import { useEffect, useState } from "react";
import { useQueryParams } from "../../../hooks/use-query-params";
import { useDebounce } from "../../../hooks/use-debounce";

export function Search() {
  const { getParam, updateQuery } = useQueryParams();
  const currentSearch = getParam("name");
  const [searchInput, setSearchInput] = useState(currentSearch || "");
  const debouncedSearch = useDebounce(searchInput, 500);

  const handleClear = () => {
    setSearchInput("");
  };

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
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchInput(e.target.value)
        }
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
