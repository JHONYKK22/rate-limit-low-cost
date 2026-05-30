# Rate limit - low cost :)

This small program attempts to simulate a rate limit implementation

> [!IMPORTANT]
>- The lib folder simulates a dependency on npm, yarn or pnpm that you could install in your project.

<br>

As you can see, this program is very basic. I was trying to simulate a Low-cost program that you might be able to use in your projects without so much hassle.

<br>

> [!NOTE]
>- You need to use a Redis connection :)

<br>

If you want to try it, use the following commands. 

<br>

> [!TIP]
>- You can look inside the controller folder and see how you can use this program/"dependency" as middleware or just using the function.

<br>

Fake ip : 201.123.10.55

```
curl -H "X-Forwarded-For: 201.123.10.55" http://localhost:3000/rate
```

```
curl -H "X-Forwarded-For: 201.123.10.55" http://localhost:3000/rate/info
```

Curl with a for:
```
for n in {1..40}; do curl -H "X-Forwarded-For: 201.123.10.55" http://localhost:3000/rate; done
```
```
for n in {1..40}; do curl -H "X-Forwarded-For: 201.123.10.55" http://localhost:3000/rate/info; sleep 2; done
```