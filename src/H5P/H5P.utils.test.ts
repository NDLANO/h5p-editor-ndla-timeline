import { getImageUrl } from "./H5P.util";

describe("H5P Utils", () => {
  describe(getImageUrl.name, () => {
    it("should return the given url if it's already absolute: secure url", () => {
      const url = "https://example.org";

      const expected = url;
      const actual = getImageUrl(url);

      expect(actual).toBe(expected);
    });

    it("should return the given url if it's already absolute: insecure url", () => {
      const url = "http://example.org";

      const expected = url;
      const actual = getImageUrl(url);

      expect(actual).toBe(expected);
    });
  });
});
