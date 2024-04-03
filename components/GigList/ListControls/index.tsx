import {
  Box,
  Flex,
  SegmentedControl,
  Divider,
  SimpleGrid,
} from "@mantine/core";
import dayjs from "dayjs";
import { Genre, Place } from "@prisma/client";
import usePreferences from "@/hooks/usePreferences";
import { ViewType } from "@/domain/ViewType";
import OptionsPopover from "@/components/GigList/ListControls/OptionsPopover";
import MonthSelector from "@/components/GigList/ListControls/MonthSelector";
import useSearchParams from "@/hooks/useSearchParams";

type Props = {
  genres: Genre[];
  places: Place[];
  selectedMonth?: Date;
  setSelectedMonth?: (monthDate: Date) => void;
};

export default function ListControls({
  genres,
  places,
  selectedMonth,
  setSelectedMonth,
}: Props) {
  const { setViewType, viewType } = usePreferences();
  const { setSearchParams } = useSearchParams();

  const incrementMonth = () => {
    const nextMonth = dayjs(selectedMonth).add(1, "month").toDate();
    updateMonth(nextMonth);
  };

  const decrementMonth = () => {
    const previousMonth = dayjs(selectedMonth).subtract(1, "month").toDate();
    updateMonth(previousMonth);
  };

  const updateMonth = (newMonth: Date) => {
    setSelectedMonth?.(newMonth);
    const changes = new Map<string, number>([
      ["année", newMonth.getFullYear()],
      ["mois", newMonth.getMonth() + 1], // getMonth() goes from 0 to 11
    ]);
    setSearchParams(changes);
  };

  return (
    <SimpleGrid cols={{ base: 1, sm: 3 }}>
      {/* Hidden block to preserve grid layout */}
      <Box style={{ visibility: "hidden" }}></Box>

      {selectedMonth ? (
        <Flex gap="xs" justify="center" align="center">
          <MonthSelector
            decrementMonth={decrementMonth}
            incrementMonth={incrementMonth}
            selectedMonth={selectedMonth}
            onSelectedMonthUpdate={updateMonth}
          />
        </Flex>
      ) : (
        <>
          {/* Hidden block to preserve grid layout */}
          <Box style={{ visibility: "hidden" }}></Box>
        </>
      )}

      <Flex
        gap="xs"
        justify={{ base: "center", sm: "flex-end" }}
        align="center"
      >
        <OptionsPopover genres={genres} places={places} />
        <Divider orientation="vertical" size="xs" />
        <SegmentedControl
          data={[
            { label: "Grille", value: ViewType.GRID },
            { label: "Liste", value: ViewType.LIST },
          ]}
          onChange={(data) => (data ? setViewType(data as ViewType) : null)}
          value={viewType}
        />
      </Flex>
    </SimpleGrid>
  );
}
