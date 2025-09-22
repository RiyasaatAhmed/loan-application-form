import { FormField, ComboBox, Option } from "@salt-ds/core";
import type { ChangeEvent, SyntheticEvent } from "react";
import { useMemo } from "react";
import { LOAN_STATUS } from "../../../statics/loan-status";
import { useQueryParams } from "../../../hooks/use-query-params";

export function Filter() {
  const { getParam, updateQuery } = useQueryParams();
  const status: string = getParam("status");

  // Convert status to selected array format for ComboBox
  const selected = useMemo(() => (status ? [status] : []), [status]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    updateQuery({ status: value });
  };

  const handleSelectionChange = (
    _event: SyntheticEvent,
    newSelected: string[]
  ) => {
    if (newSelected.length === 1) {
      updateQuery({ status: newSelected[0] === "All" ? "" : newSelected[0] });
    } else {
      updateQuery({ status: "" });
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
