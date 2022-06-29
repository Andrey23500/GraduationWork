import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "boolActive",
})
export class BoolPipe implements PipeTransform {
  transform(value: string): string {
    if (value.toString() === "true") {
      return "Active";
    }
    return "Inactive";
  }
}
