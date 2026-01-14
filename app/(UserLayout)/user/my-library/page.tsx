"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/context/user.provider";
import { useGetMyShelves } from "@/hooks/shelve.hook";
const tabsData = [
  {
    value: "WANT_TO_READ",
    label: "Want to Read",
  },
  {
    value: "CURRENTLY_READING",
    label: "Currently Reading",
  },
  {
    value: "READ",
    label: "Read",
  },
];

export default function MyLibrary() {
  const { user } = useUser();
  const { data: myShelves, isLoading, isError, error } = useGetMyShelves();
  return (
    <section className="min-h-screen max-w-7xl mx-auto p-4">
      <div>
        <Tabs>
          <TabsList>
            {tabsData.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabsData.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <h1 className="text-2xl font-bold">{tab.label}</h1>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
