import { Center, Loader } from "@mantine/core";
import Layout from "@/components/Layout";
import { Suspense } from "react";
import AccountPage from "./account-page";

export default function Page() {
  return (
    <Layout title={"Mon compte"} withPaper>
      <Suspense
        fallback={
          <Center h={200}>
            <Loader />
          </Center>
        }
      >
        <AccountPage />
      </Suspense>
    </Layout>
  );
}
