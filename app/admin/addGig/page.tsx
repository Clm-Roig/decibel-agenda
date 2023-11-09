import { Suspense } from "react";
import Layout from "../../../components/Layout";
import { Center, Loader } from "@mantine/core";
import AddGig from "./add-gig-page";

export default function Page() {
  return (
    <Layout title="Ajouter un concert" withPaper>
      <Center>
        <Suspense fallback={<Loader />}>
          <AddGig />
        </Suspense>
      </Center>
    </Layout>
  );
}
