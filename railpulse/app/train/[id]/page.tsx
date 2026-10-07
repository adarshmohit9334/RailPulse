import TrainClient from "./TrainClient";

export const instant = false;

export default async function TrainPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <TrainClient id={id} />;
}
