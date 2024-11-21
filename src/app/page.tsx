import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="flex flex-1 w-screen h-screen items-center justify-center">
      <div className="flex flex-col gap-2 items-center justify-center">
        <Input className="w-44" placeholder="email" />
        <Input className="w-44" placeholder="senha" />
        <Button className="w-44">Entrar</Button>
      </div>
    </div>
  );
}
