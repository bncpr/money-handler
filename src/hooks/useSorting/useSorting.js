import * as R from "ramda";
import { useEffect, useState } from "react";

export const useSorting = ({ data }) => {
  const [sorted, setSorted] = useState([]);

  const [sortState, setSortState] = useState({
    date: "",
    value: "",
    payer: "",
    category: "",
  });

  const onChangeSort = R.curry((field, order) => {
    setSortState(R.pipe(R.map(R.always("")), R.assoc(field, order))(sortState));
  });

  useEffect(() => {
    const [field, order] = R.pipe(
      R.toPairs,
      R.filter(R.prop(1)),
      R.head,
      R.defaultTo([])
    )(sortState);

    setSorted(
      !order
        ? data
        : R.sort(
          order === "ascend"
            ? R.ascend(R.prop(field))
            : R.descend(R.prop(field)),
          data
        )
    );
  }, [sortState, data]);

  return { sorted, onChangeSort, sortState };
};
