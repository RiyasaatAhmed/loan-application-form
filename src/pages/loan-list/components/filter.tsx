import { FormField, ComboBox, Option } from "@salt-ds/core";
import type { ChangeEvent, ReactElement, SyntheticEvent } from "react";
import { useMemo } from "react";
import { LOAN_STATUS } from "../../../statics/loan-status";
import { useQueryParams } from "../../../hooks/use-query-params";
import {
  DEFAULT_EMPTY_ARRAY,
  DEFAULT_EMPTY_STRING,
} from "../../../statics/constants";

/** Filter component with status dropdown and URL sync */
export function Filter(): ReactElement {
  const { getParam, updateQuery } = useQueryParams();
  const status: string = getParam("status");

  // Convert status to selected array format for ComboBox
  const selected = useMemo(
    () => (status ? [status] : DEFAULT_EMPTY_ARRAY),
    [status]
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    updateQuery({ status: value });
  };

  // Handle dropdown selection with "All" option logic
  const handleSelectionChange = (
    _event: SyntheticEvent,
    newSelected: Array<string>
  ) => {
    if (newSelected.length === 1) {
      updateQuery({
        status:
          newSelected[0] === "All" ? DEFAULT_EMPTY_STRING : newSelected[0],
      });
    } else {
      updateQuery({ status: DEFAULT_EMPTY_STRING });
    }
  };

  return (
    <FormField id="status">
      <ComboBox
        onChange={handleChange}
        onSelectionChange={handleSelectionChange}
        placeholder="All"
        value={status}
        selected={selected}
        inputProps={{ name: "status" }}
      >
        {Object.values(LOAN_STATUS).map((status: string, index: number) => (
          <Option key={index} value={status}>
            {status}
          </Option>
        ))}
      </ComboBox>
    </FormField>
  );
}
