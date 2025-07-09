import addCateory from "@/actions/category/addCategory";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function AddCategory() {
  return (
    <main>
        <form action={addCateory}>
            <Input type="text" name="category"/>
            <Button>Add Category</Button>
        </form>
    </main>
  )
}
