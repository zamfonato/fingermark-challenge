import CardStats from "../common/CardStats";

const Cards = () => {
  return (
    <>
      <div className="relative bg-lightBlue-600 md:pt-32 pb-16 pt-12">
        <div className="px-4 md:px-12 mx-auto w-full">
          <div>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="OPENED"
                  statTitle="3"
                  statDescripiron="Updated at 11:58pm"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-lime-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="CLOSED"
                  statTitle="1"
                  statDescripiron="Updated at 11:58pm"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="EXAMPLE 1"
                  statTitle="1"
                  statDescripiron="Updated at 11:58pm"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-fuchsia-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="EXAMPLE 2"
                  statTitle="2"
                  statDescripiron="Updated at 11:58pm"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-pink-500"
                />
              </div>
            </div>
          </div>
        </div>          
      </div>
    </>
  );
};

export default Cards;
