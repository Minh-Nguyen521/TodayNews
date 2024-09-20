import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Search, Rss } from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { Badge } from "./components/ui/badge";
import fetchNews from "./fetchNews";
function App() {
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);

  const handleGetNews = async (value) => {
    if (value === "") {
      return;
    }

    const data = await fetchNews(value);
    console.log(data.articles);
    setData(data.articles);
  };

  useEffect(() => {
    handleGetNews("everything");
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleGetNews(value);
    }
  };
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <Button
              className="flex items-center space-x-2 bg-white text-black hover:bg-gray-100"
              onClick={() => handleGetNews("everything")}
            >
              <span className="inline-block font-bold">NewsSum</span>
            </Button>
            <Button
              className="flex items-center text-sm font-medium text-muted-foreground bg-white text-black hover:bg-gray-100"
              onClick={() => handleGetNews("world")}
            >
              World
            </Button>
            <Button
              className="flex items-center text-sm font-medium text-muted-foreground bg-white text-black hover:bg-gray-100"
              onClick={() => handleGetNews("technology")}
            >
              Technology
            </Button>
            <Button
              className="flex items-center text-sm font-medium text-muted-foreground bg-white text-black hover:bg-gray-100"
              onClick={() => handleGetNews("crypto")}
            >
              Crypto
            </Button>
            <Button
              className="flex items-center text-sm font-medium text-muted-foreground bg-white text-black hover:bg-gray-100"
              onClick={() => handleGetNews("business")}
            >
              Business
            </Button>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <div className="w-full flex-1 md:w-auto md:flex-none ">
              <div className="relative flex flex-row">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search"
                  className="pl-8 md:w-[300px] lg:w-[300px]"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <Button
                  className="flex items-center space-x-2 bg-white text-black hover:bg-gray-100 ml-4"
                  onClick={() => handleGetNews(value)}
                >
                  Find
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            {data.map(
              (article) =>
                article?.title !== "[Removed]" &&
                article?.urlToImage !== null && (
                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle>Top Story</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <img
                        src={article.urlToImage}
                        className="w-full h-64 object-cover rounded-lg mb-4"
                      />
                      <h3 className="text-2xl font-bold mb-2">
                        {article.title}
                      </h3>
                      <p className="text-muted-foreground mb-4"></p>
                      <Button asChild>
                        <a href={article.url} target="_blank">
                          Read More
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                )
            )}
          </div>

          <div className="space-y-8">
            {data.map(
              (article, index) =>
                article?.title !== "[Removed]" &&
                article?.urlToImage !== null && (
                  <Card key={index}>
                    {/* <CardHeader>
                  <CardTitle>{article.category}</CardTitle>
                </CardHeader> */}
                    <CardContent>
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-40 object-cover rounded-lg mb-4"
                      />
                      <h3 className="text-xl font-bold mb-2">
                        {article.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {article.decription}
                      </p>
                      <div className="flex justify-between items-center text-sm text-muted-foreground">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            {/* <AvatarFallback>
                          {article.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback> */}
                          </Avatar>
                          <span>{article.author}</span>
                        </div>
                        {/* <span>
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </span> */}
                      </div>
                    </CardContent>
                  </Card>
                )
            )}
          </div>
        </div>
      </main>

      <footer className="border-t bg-muted/40">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">NewsSum</h3>
              <p className="text-muted-foreground">
                Your source for concise news summaries.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">Facebook</span>
                </Button>
                <Button variant="ghost" size="icon">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                  <span className="sr-only">Twitter</span>
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center text-muted-foreground">
            <p>&copy; 2023 hehe</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default App;
