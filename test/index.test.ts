import "jasmine";
import {EMBLAZON} from "@/index";



describe("index.ts", () => {

  it("should export members correctly", () => {
    expect(EMBLAZON).toBeDefined("Members were not exported correctly");
  });

});
