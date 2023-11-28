"use client";

import React, { useState } from "react";
import { ActionIcon, Group, Skeleton, Stack, Table } from "@mantine/core";
import { BandWithGenres } from "@/domain/Band/Band.type";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { Band, Genre } from "@prisma/client";
import { normalizeString } from "@/utils/utils";
import GenreBadge from "@/components/GenreBadge";
import TableHeader from "@/components/BandTable/TableHeader";

type Props = {
  bands: BandWithGenres[] | undefined;
  genres: Genre[];
  isLoading: boolean;
  onEditBand: (band: Band) => void;
};

export default function BandTable({
  bands,
  genres,
  isLoading,
  onEditBand,
}: Props) {
  const [selectedGenres, setSelectedGenres] = useState<Genre["id"][]>([]);
  const [searchedName, setSearchedName] = useState<string>("");

  const filteredBands = bands
    // filter by genres
    ?.filter((band) =>
      band.genres.some(
        (g) => selectedGenres?.length === 0 || selectedGenres?.includes(g.id),
      ),
    )
    // filter by name
    .filter((band) =>
      normalizeString(band.name).includes(normalizeString(searchedName)),
    );

  return (
    <>
      {isLoading ? (
        <Stack>
          <Table>
            <TableHeader
              bands={bands}
              genres={genres}
              isLoading={isLoading}
              onEditBand={onEditBand}
              searchedName={searchedName}
              setSearchedName={setSearchedName}
              selectedGenres={selectedGenres}
              setSelectedGenres={setSelectedGenres}
            />
          </Table>
          {Array(20)
            .fill(1)
            .map((v, idx) => (
              <Skeleton key={idx} height={30} width={800} />
            ))}
        </Stack>
      ) : (
        <Table
          striped
          stickyHeader
          highlightOnHover
          withColumnBorders
          maw={800}
          layout="fixed"
        >
          <TableHeader
            bands={bands}
            genres={genres}
            isLoading={isLoading}
            onEditBand={onEditBand}
            searchedName={searchedName}
            setSearchedName={setSearchedName}
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
          />

          <Table.Tbody>
            {filteredBands?.map((band) => (
              <Table.Tr key={band.id}>
                <Table.Td>{band.name}</Table.Td>
                <Table.Td>
                  <Group gap={2}>
                    {band.genres?.map((genre) => (
                      <GenreBadge key={genre?.id} genre={genre} size="sm" />
                    ))}
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Group>
                    <ActionIcon onClick={() => onEditBand(band)}>
                      <IconEdit />
                    </ActionIcon>
                    <ActionIcon disabled color="red">
                      <IconTrash />
                    </ActionIcon>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      )}
    </>
  );
}
