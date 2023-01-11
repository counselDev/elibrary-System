import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Card } from "../../components/admin";
import AreaGraph from "../../components/admin/chart/AreaGraph";
import RecentBookRequest from "../../components/admin/RecentBookRequest";
import { useAppContext } from "../../context/AppContext";

export default function Dashboard() {
  const { getStats, getBookRequest, cardStats } = useAppContext();

  useEffect(() => {
    const getData = async () => {
      await getStats();
      await getBookRequest();
    };

    getData();
  }, []);

  return (
    <div className=" ">
      <div className="h-full pb-12 ">
        <div className="flex p-4 space-x-3">
          {!cardStats ? (
            <TailSpin />
          ) : (
            cardStats?.slice(0, 4).map((stat, index) => (
              <Card
                key={index}
                title={stat.title}
                total={stat.total}
                icon={index}
              />
            ))
          )}
        </div>

        <div className="flex  ml-3 mt-6 space-x-6  mr-4">
          <AreaGraph />
          <RecentBookRequest />
        </div>
      </div>
    </div>
  );
}
