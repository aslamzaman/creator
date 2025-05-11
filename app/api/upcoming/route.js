import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

const list = [
    {
        "title": "Show Me Your Glory (2025)",
        "url": "https://www.imdb.com/title/tt36164068/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BMWM2OGI3OTItZTRhZC00NWQ1LTgwNmQtNDUyYmQ0ZWI0YTUxXkEyXkFqcGc@._V1_QL75_UY74_CR0,0,50,74_.jpg"
    },
    {
        "title": "The Lost Princess (2025)",
        "url": "https://www.imdb.com/title/tt14830912/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BNDk1Mjg5MjMtOTIzOS00YWNmLTllYmUtNTEyZWVhMTgyMGQ3XkEyXkFqcGc@._V1_QL75_UX50_CR0,0,50,74_.jpg"
    },
    {
        "title": "The Lost Locket (2025)",
        "url": "https://www.imdb.com/title/tt12671466/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BYTZmY2Y3MDItYTcxNC00ZGFhLWFmNDAtNWZkYTE5MmQzMWUxXkEyXkFqcGc@._V1_QL75_UX50_CR0,1,50,74_.jpg"
    },
    {
        "title": "Final Destination: Bloodlines (2025)",
        "url": "https://www.imdb.com/title/tt9619824/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BMzc3OWFhZWItMTE2Yy00N2NmLTg1YTktNGVlNDY0ODQ5YjNlXkEyXkFqcGc@._V1_QL75_UX50_CR0,0,50,74_.jpg"
    },
    {
        "title": "Hurry Up Tomorrow (2025)",
        "url": "https://www.imdb.com/title/tt26927452/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BNDQ2MGIyNDQtYjVhOS00ZjI1LWFmYzctMWI2MGZhZGFhZWM4XkEyXkFqcGc@._V1_QL75_UX50_CR0,0,50,74_.jpg"
    },
    {
        "title": "Teenage Mutant Ninja Turtles: The Rise of Leo (2025)",
        "url": "https://www.imdb.com/title/tt36270018/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BNTZlYzY1YWEtNmYxOS00Yzc4LWIxOWMtZjQyNGFjYjJmYThlXkEyXkFqcGc@._V1_QL75_UX50_CR0,1,50,74_.jpg"
    },
    {
        "title": "Magic Farm (2025)",
        "url": "https://www.imdb.com/title/tt34966919/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BMmMwZmFkNTQtZDY1My00OTEzLWEyNDMtNTFhM2FhMWQzZjZjXkEyXkFqcGc@._V1_QL75_UX50_CR0,0,50,74_.jpg"
    },
    {
        "title": "The Loot (2025)",
        "url": "https://www.imdb.com/title/tt35462051/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BMGIzNDAyMWUtYWY5NS00MWRkLTkwNDUtMWI0NzQxYTliODZkXkEyXkFqcGc@._V1_QL75_UY74_CR1,0,50,74_.jpg"
    },
    {
        "title": "The Crypto: Beyond (2025)",
        "url": "https://www.imdb.com/title/tt30609082/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BNDcxYWYyMzAtMjRjYi00NGMzLWE4NDQtOWExNzk4MjhiNzE2XkEyXkFqcGc@._V1_QL75_UX50_CR0,1,50,74_.jpg"
    },
    {
        "title": "Mission: Impossible - The Final Reckoning (2025)",
        "url": "https://www.imdb.com/title/tt9603208/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BZGQ5NGEyYTItMjNiMi00Y2EwLTkzOWItMjc5YjJiMjMyNTI0XkEyXkFqcGc@._V1_QL75_UX50_CR0,0,50,74_.jpg"
    },
    {
        "title": "Lilo & Stitch (2025)",
        "url": "https://www.imdb.com/title/tt11655566/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BYTBmMDBhNWYtNTk4MS00NzBmLTk5ZWItM2ZlZjY4NTYxNWQzXkEyXkFqcGc@._V1_QL75_UX50_CR0,0,50,74_.jpg"
    },
    {
        "title": "The Last Rodeo (2025)",
        "url": "https://www.imdb.com/title/tt30908405/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BYTI4NjcwODMtZGVhMi00ODhhLWIwODItZTQ4MmY0ZmU5OTliXkEyXkFqcGc@._V1_QL75_UX50_CR0,0,50,74_.jpg"
    },
    {
        "title": "Sister Midnight (2024)",
        "url": "https://www.imdb.com/title/tt32060445/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BZjE4M2Y0YmYtZWVmMi00NjA2LThhODAtZWI0NDdiOWUxOWE5XkEyXkFqcGc@._V1_QL75_UX50_CR0,0,50,74_.jpg"
    },
    {
        "title": "Broken Trail (2025)",
        "url": "https://www.imdb.com/title/tt32812105/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BOWIxZDA2ODMtM2U1Ny00ZjAxLWFlNDEtNTMyMGRiNThiYjE1XkEyXkFqcGc@._V1_QL75_UX50_CR0,1,50,74_.jpg"
    },
    {
        "title": "Karate Kid: Legends (2025)",
        "url": "https://www.imdb.com/title/tt1674782/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BM2MwYTlkY2MtNmUzNy00MTljLThjNDAtZGUzNzMxMzcxNzM5XkEyXkFqcGc@._V1_QL75_UX50_CR0,0,50,74_.jpg"
    },
    {
        "title": "Bring Her Back (2025)",
        "url": "https://www.imdb.com/title/tt32246771/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BZTlhYTk1ZTEtOWY3NC00NWQ5LTlkOTctNjQ3ZDYyZGE5ZWNlXkEyXkFqcGc@._V1_QL75_UX50_CR0,0,50,74_.jpg"
    },
    {
        "title": "Tim Travers and the Time Traveler's Paradox (2024)",
        "url": "https://www.imdb.com/title/tt22884216/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BMmEwYmRmYWYtYWMwZS00NDk1LWI3NGEtZDVmM2Y4OGM5NzM2XkEyXkFqcGc@._V1_QL75_UY74_CR0,0,50,74_.jpg"
    },
    {
        "title": "Jane Austen a gâché ma vie (2024)",
        "url": "https://www.imdb.com/title/tt31112509/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BYzBkMTdhMzMtMTgwNS00NDkwLWEwOGEtMTQyNmVmOTk1YWMxXkEyXkFqcGc@._V1_QL75_UX50_CR0,0,50,74_.jpg"
    },
    {
        "title": "Boomerang Bro Gets Grounded: The First Movie - Kalahari Waterpark Disaster (2025)",
        "url": "https://www.imdb.com/title/tt36386386/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BNWU0MzhlZTAtZjE3OC00ZjgxLWE5ZjItN2IxZTYyYjAwYmQyXkEyXkFqcGc@._V1_QL75_UY74_CR3,0,50,74_.jpg"
    },
    {
        "title": "Thug Life (2025)",
        "url": "https://www.imdb.com/title/tt23398540/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BMTRlMjkwZjQtMGIwOC00OWFmLTk5OWMtMmY1NWYxOGVkYjFkXkEyXkFqcGc@._V1_QL75_UX50_CR0,1,50,74_.jpg"
    },
    {
        "title": "Ballerina (2025)",
        "url": "https://www.imdb.com/title/tt7181546/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BNzdhZmY2OTQtYWI4OC00ZThkLTlhZjAtNzE2YzRjM2Q5YjJlXkEyXkFqcGc@._V1_QL75_UX50_CR0,0,50,74_.jpg"
    },
    {
        "title": "The Life of Chuck (2024)",
        "url": "https://www.imdb.com/title/tt12908150/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BOTA1MjU5OWUtYWEwMi00N2NkLWE1MTQtYWQ5MDcxNTJkMjdkXkEyXkFqcGc@._V1_QL75_UY74_CR0,0,50,74_.jpg"
    },
    {
        "title": "The Phoenician Scheme (2025)",
        "url": "https://www.imdb.com/title/tt30840798/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BNTJmODQzYmItNTZlMy00Mjg0LTk1NjctYjM4ZGI0NTM3ZTVjXkEyXkFqcGc@._V1_QL75_UX50_CR0,2,50,74_.jpg"
    },
    {
        "title": "The Ritual (2025)",
        "url": "https://www.imdb.com/title/tt32194932/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BYjc5ZTA4ZjUtOTY2ZS00MjA0LTkxNGUtNDc1ZDVlOTU2ZGQ2XkEyXkFqcGc@._V1_QL75_UX50_CR0,0,50,74_.jpg"
    },
    {
        "title": "Dangerous Animals (2025)",
        "url": "https://www.imdb.com/title/tt32299316/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BNzZhYzU1MTAtMmM2MS00MGY2LWFiMjktMGVjYmFmZDViNWJkXkEyXkFqcGc@._V1_QL75_UX50_CR0,0,50,74_.jpg"
    },
    {
        "title": "I Don't Understand You (2024)",
        "url": "https://www.imdb.com/title/tt27623406/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BYTZkZTNmMzUtM2FiYy00YjEyLWFiMDktOWVhOWVmZGZmNDkwXkEyXkFqcGc@._V1_QL75_UX50_CR0,0,50,74_.jpg"
    },
    {
        "title": "Bad Shabbos (2024)",
        "url": "https://www.imdb.com/title/tt14402042/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BODUwZDJmMTQtNTdmMi00NmQzLWFjNzItNTNlOWRjNDg4Y2E5XkEyXkFqcGc@._V1_QL75_UX50_CR0,1,50,74_.jpg"
    },
    {
        "title": "Pavements (2024)",
        "url": "https://www.imdb.com/title/tt30253514/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BM2VhNzcyYjUtNjI4OS00YjFmLWIxNmItYWM0NjEwNDY0M2U4XkEyXkFqcGc@._V1_QL75_UX50_CR0,0,50,74_.jpg"
    },
    {
        "title": "Crawlers (2025)",
        "url": "https://www.imdb.com/title/tt8639168/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BZjVjNmNlYmUtMWRiOS00ODFmLWE0MDAtMDAyMDkzMThiYWQyXkEyXkFqcGc@._V1_QL75_UY74_CR1,0,50,74_.jpg"
    },
    {
        "title": "How to Train Your Dragon (2025)",
        "url": "https://www.imdb.com/title/tt26743210/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BODA5Y2M0NjctNWQzMy00ODRhLWE0MzUtYmE1YTAzZjYyYmQyXkEyXkFqcGc@._V1_QL75_UX50_CR0,3,50,74_.jpg"
    },
    {
        "title": "Materialists (2025)",
        "url": "https://www.imdb.com/title/tt30253473/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BNmQxMTI1YmEtOGY3Yi00NzVlLWEzMjAtYTI1NWZkNDFiMDg1XkEyXkFqcGc@._V1_QL75_UX50_CR0,2,50,74_.jpg"
    },
    {
        "title": "The Unholy Trinity (2024)",
        "url": "https://www.imdb.com/title/tt6300910/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BOTE3MWJhNjYtNjZhOS00NmZiLTk4ODQtYjkzMmU3NGM0MjZlXkEyXkFqcGc@._V1_QL75_UY74_CR31,0,50,74_.jpg"
    },
    {
        "title": "Prime Minister (2025)",
        "url": "https://www.imdb.com/title/tt34965625/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BMDE4NjJmNTMtMDA2Ny00OTQ1LTllM2QtNWE2ZWM5MDFmNjNkXkEyXkFqcGc@._V1_QL75_UY74_CR41,0,50,74_.jpg"
    },
    {
        "title": "Finding Faith (2025)",
        "url": "https://www.imdb.com/title/tt30877322/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BZjA1ZmJkZmQtNGM3Ny00Yjk2LWJhMTMtMzJkMTMwMWE0YzAyXkEyXkFqcGc@._V1_QL75_UX50_CR0,0,50,74_.jpg"
    },
    {
        "title": "28 Years Later (2025)",
        "url": "https://www.imdb.com/title/tt10548174/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BNjgwYTI0YjctMWYzNS00MmI1LWI5YTctNmE1YjBkNDFlNWMxXkEyXkFqcGc@._V1_QL75_UY74_CR5,0,50,74_.jpg"
    },
    {
        "title": "Elio (2025)",
        "url": "https://www.imdb.com/title/tt4900148/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BOWE5ZDMyMWEtOTZjMi00YzFhLWE4OTEtNDc3MDMzZjFmMmIzXkEyXkFqcGc@._V1_QL75_UX50_CR0,0,50,74_.jpg"
    },
    {
        "title": "Bride Hard (2025)",
        "url": "https://www.imdb.com/title/tt21317634/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BODU1N2IyODktMThkNi00MDIwLThlNjUtNTkyMWE3MjZlYjhjXkEyXkFqcGc@._V1_QL75_UY74_CR31,0,50,74_.jpg"
    },
    {
        "title": "Sovereign (2025)",
        "url": "https://www.imdb.com/title/tt26843513/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BMmMxNDY4NjYtNzMxZS00ODRhLThhNTctN2JmZmQzOTU3MjMxXkEyXkFqcGc@._V1_QL75_UX50_CR0,0,50,74_.jpg"
    },
    {
        "title": "Marlee Matlin: Not Alone Anymore (2025)",
        "url": "https://www.imdb.com/title/tt33322301/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BNzY2OWY2YmYtZDFiZi00YjFlLTg3MGMtZDZjZGNlNTMwYjBlXkEyXkFqcGc@._V1_QL75_UY74_CR41,0,50,74_.jpg"
    },
    {
        "title": "Harley Flanagan: Wired for Chaos (2024)",
        "url": "https://www.imdb.com/title/tt34280312/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BN2IzNTA4ZjQtYzlkNC00N2Q5LThiNGYtY2Q4ZDM4ZTY0MWEyXkEyXkFqcGc@._V1_QL75_UX50_CR0,0,50,74_.jpg"
    },
    {
        "title": "Lost Weekend (2025)",
        "url": "https://www.imdb.com/title/tt16085546/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BNzRhMjJhYzYtMWNjZS00ZTE5LWEwMmYtMmYxNWFjYTNhZDQ3XkEyXkFqcGc@._V1_QL75_UX50_CR0,5,50,74_.jpg"
    },
    {
        "title": "F1: The Movie (2025)",
        "url": "https://www.imdb.com/title/tt16311594/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BNGI0MDI4NjEtOWU3ZS00ODQyLWFhYTgtNGYxM2ZkM2Q2YjE3XkEyXkFqcGc@._V1_QL75_UX50_CR0,0,50,74_.jpg"
    },
    {
        "title": "M3GAN 2.0 (2025)",
        "url": "https://www.imdb.com/title/tt26342662/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BMzFmNjVjZWQtZjI5Zi00YThiLTg0ZWItZDdjYzhhZDE1NTE2XkEyXkFqcGc@._V1_QL75_UX50_CR0,3,50,74_.jpg"
    },
    {
        "title": "Ponyboi (2024)",
        "url": "https://www.imdb.com/title/tt23939106/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BYTJhZmM2MzItOGQ3ZC00NDAwLWJjZDYtYThiNjQxOWRlZTAzXkEyXkFqcGc@._V1_QL75_UX50_CR0,1,50,74_.jpg"
    },
    {
        "title": "SKG: Death Row Records - Thru My Eyez (Documentary) (2025)",
        "url": "https://www.imdb.com/title/tt35435308/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BNGMxMGUyYmUtYmU1ZS00NzA3LWI5NDYtZmNlOTU4NjhmYTZhXkEyXkFqcGc@._V1_QL75_UY74_CR41,0,50,74_.jpg"
    },
    {
        "title": "Jurassic World: Rebirth (2025)",
        "url": "https://www.imdb.com/title/tt31036941/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BYjlmODRkM2YtMDAxOS00ZTA5LTgyYWYtZWI2NjRjMzRkODU0XkEyXkFqcGc@._V1_QL75_UX50_CR0,3,50,74_.jpg"
    },
    {
        "title": "40 Acres (2024)",
        "url": "https://www.imdb.com/title/tt29634843/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BOTRmZTIzMzQtZDQwOS00NGM5LWI1YTItMTc0MjE0NjczMDhlXkEyXkFqcGc@._V1_QL75_UX50_CR0,0,50,74_.jpg"
    },
    {
        "title": "Divine Soldiers (2025)",
        "url": "https://www.imdb.com/title/tt15138244/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BYTg1MDZkODYtNzM1MS00YzljLThlNjUtYmU0NDM3NTI4ZjBjXkEyXkFqcGc@._V1_QL75_UY74_CR5,0,50,74_.jpg"
    },
    {
        "title": "Touch (2025)",
        "url": "https://www.imdb.com/title/tt10826586/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BZGYwYzlkYjQtOTliMy00MWZkLTg4ZDktNTZhNzg0MDcwNWI5XkEyXkFqcGc@._V1_QL75_UY74_CR1,0,50,74_.jpg"
    },
    {
        "title": "Reparations in America (2025)",
        "url": "https://www.imdb.com/title/tt4601194/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BY2JjOTkzZDAtZmVhZi00M2U2LWFlYTQtNWFkMDc4MzJjZDUxXkEyXkFqcGc@._V1_QL75_UY74_CR41,0,50,74_.jpg"
    },
    {
        "title": "Superman (2025)",
        "url": "https://www.imdb.com/title/tt5950044/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BZjFhZmU5NzUtZTg4Zi00ZjRjLWI0YmQtODk2MzI4YjNhYTdkXkEyXkFqcGc@._V1_QL75_UX50_CR0,0,50,74_.jpg"
    },
    {
        "title": "Skill House (2025)",
        "url": "https://www.imdb.com/title/tt19637220/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BNWE4MWM5YTktMjZmZC00Mjg0LTliYjAtYmI5ZTM0Y2QzZDYwXkEyXkFqcGc@._V1_QL75_UX50_CR0,0,50,74_.jpg"
    },
    {
        "title": "Duino (2024)",
        "url": "https://www.imdb.com/title/tt17499100/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BYjc4MmIzNGQtZjNmZi00ODllLWJkMzAtNWY3MTBlYjgzMzYxXkEyXkFqcGc@._V1_QL75_UY74_CR1,0,50,74_.jpg"
    },
    {
        "title": "I Know What You Did Last Summer (2025)",
        "url": "https://www.imdb.com/title/tt4045450/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BZDYwNDcwMWUtNjNhNi00N2ZhLWE1MzItMjg3MDg2MGI0ZjNiXkEyXkFqcGc@._V1_QL75_UY74_CR5,0,50,74_.jpg"
    },
    {
        "title": "Eddington (2025)",
        "url": "https://www.imdb.com/title/tt31176520/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BMDgzZTgzOTEtMTllZS00ZDdjLWE4NWUtOTkwOTk0Mjk3ODA5XkEyXkFqcGc@._V1_QL75_UY74_CR5,0,50,74_.jpg"
    },
    {
        "title": "Smurfs (2025)",
        "url": "https://www.imdb.com/title/tt18069420/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BODJhNzZhMDItYWNjYy00YmFhLTgyMjEtZTI4MjA1ZGEyZGFkXkEyXkFqcGc@._V1_QL75_UX50_CR0,0,50,74_.jpg"
    },
    {
        "title": "The Fantastic Four: First Steps (2025)",
        "url": "https://www.imdb.com/title/tt10676052/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BY2U5MjM2MWEtYTU2ZC00YjkyLWE2ZTctYzI1ZDI3Y2IzNGVkXkEyXkFqcGc@._V1_QL75_UX50_CR0,0,50,74_.jpg"
    },
    {
        "title": "AJ Goes to the Dog Park (2024)",
        "url": "https://www.imdb.com/title/tt33318123/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BMTY0NzRkMzUtMjRhMS00YjY0LWFhNGYtNTc3MGNkZTUzM2FlXkEyXkFqcGc@._V1_QL75_UY74_CR0,0,50,74_.jpg"
    },
    {
        "title": "Together (2025)",
        "url": "https://www.imdb.com/title/tt31184028/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BYjM5MmEyOTgtZmRhYi00Y2MyLWIwY2EtN2Y5YjQ4ZWVhYmYxXkEyXkFqcGc@._V1_QL75_UX50_CR0,0,50,74_.jpg"
    },
    {
        "title": "The Naked Gun (2025)",
        "url": "https://www.imdb.com/title/tt3402138/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BOGZjOTBkY2MtM2MzZS00NTlhLWI0NzItMzBhNGQxMTZlNjlmXkEyXkFqcGc@._V1_QL75_UX50_CR0,0,50,74_.jpg"
    },
    {
        "title": "The Bad Guys 2 (2025)",
        "url": "https://www.imdb.com/title/tt30017619/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BZTAyZDA2MmEtYjFlMy00MDAxLWJlMDEtZGNiNGUyYTVmNGVlXkEyXkFqcGc@._V1_QL75_UX50_CR0,3,50,74_.jpg"
    },
    {
        "title": "L'histoire de Souleymane (2024)",
        "url": "https://www.imdb.com/title/tt32086046/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BOWY4MzliY2MtYjNhNy00MTk1LWJkOGMtMDdiMTAzODY4MjgxXkEyXkFqcGc@._V1_QL75_UY74_CR2,0,50,74_.jpg"
    },
    {
        "title": "Experiment 77 (2025)",
        "url": "https://www.imdb.com/title/tt4292334/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BOTRiNzE2NTUtOWJhMC00ZmNmLWFhOTAtNDkzMGY1MDEyZDhhXkEyXkFqcGc@._V1_QL75_UX50_CR0,1,50,74_.jpg"
    },
    {
        "title": "Weapons (2025)",
        "url": "https://www.imdb.com/title/tt26581740/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BNTBhNWJjZWItYzY3NS00M2NkLThmOWYtYTlmNzBmN2UxZWFjXkEyXkFqcGc@._V1_QL75_UY74_CR5,0,50,74_.jpg"
    },
    {
        "title": "Freakier Friday (2025)",
        "url": "https://www.imdb.com/title/tt31956415/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BODliMjA5ODItZDczMi00YmM2LWFjZDMtZWM4YTk5YmE5ODViXkEyXkFqcGc@._V1_QL75_UX50_CR0,0,50,74_.jpg"
    },
    {
        "title": "North Star (2023)",
        "url": "https://www.imdb.com/title/tt20911974/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BZjAxY2VkMTctMWU2Yy00YTFmLWFmMTAtZjNmZTdmYTgzY2VmXkEyXkFqcGc@._V1_QL75_UY74_CR41,0,50,74_.jpg"
    },
    {
        "title": "Boys Go to Jupiter (2024)",
        "url": "https://www.imdb.com/title/tt31021863/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BZWFiMjVmMWMtYzMxYi00NDA5LTk3OTctM2ZkMmU3NDA3NmMzXkEyXkFqcGc@._V1_QL75_UY74_CR5,0,50,74_.jpg"
    },
    {
        "title": "Nobody 2 (2025)",
        "url": "https://www.imdb.com/title/tt28996126/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BNTdmODYzMTMtMTdmYy00YmM1LWE0ZTAtZmRkMjkwOWMyNzAzXkEyXkFqcGc@._V1_QL75_UX50_CR0,3,50,74_.jpg"
    },
    {
        "title": "Witchboard (2024)",
        "url": "https://www.imdb.com/title/tt2256055/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BZjU4N2UxOTQtOWM0NS00YWMyLTg3YjUtNmNlMWIxYzNkMWVjXkEyXkFqcGc@._V1_QL75_UY74_CR4,0,50,74_.jpg"
    },
    {
        "title": "Honey Don't! (2025)",
        "url": "https://www.imdb.com/title/tt30645201/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BNGEzZWY4NmQtNTFiMC00MWM4LWEzMTQtNjAzZWMyMzJkYjA2XkEyXkFqcGc@._V1_QL75_UX50_CR0,0,50,74_.jpg"
    },
    {
        "title": "Highest 2 Lowest (2025)",
        "url": "https://www.imdb.com/title/tt31194612/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BNGVlMzQzNTMtMTQ5YS00OTVlLTg5MTMtNTRiZWFlNDAwYmEzXkEyXkFqcGc@._V1_QL75_UX50_CR0,0,50,74_.jpg"
    },
    {
        "title": "Americana (2023)",
        "url": "https://www.imdb.com/title/tt17676734/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BYmVmYzRkYjEtMjMyMi00MjJhLTk4YmEtNDI1OGIyNzRiMDkxXkEyXkFqcGc@._V1_QL75_UY74_CR5,0,50,74_.jpg"
    },
    {
        "title": "Splitsville (2025)",
        "url": "https://www.imdb.com/title/tt33247023/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BNDE4YTQwMjQtZTFhMi00Nzg3LWIyMzYtMmJiMmJmYTFhOGQ3XkEyXkFqcGc@._V1_QL75_UY74_CR41,0,50,74_.jpg"
    },
    {
        "title": "Clika (2025)",
        "url": "https://www.imdb.com/title/tt28334938/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BNzEyYjAyNWMtY2Y3Yy00YjRmLTllNDYtMThkMDFlNWI3YTkwXkEyXkFqcGc@._V1_QL75_UX50_CR0,0,50,74_.jpg"
    },
    {
        "title": "Caught Stealing (2025)",
        "url": "https://www.imdb.com/title/tt1493274/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BYjk4YTdmODktZjI5Ny00MDA0LTg3MDAtYzEzMjBjZmVmMjU5XkEyXkFqcGc@._V1_QL75_UY74_CR5,0,50,74_.jpg"
    },
    {
        "title": "The Toxic Avenger (2023)",
        "url": "https://www.imdb.com/title/tt1633359/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BNzFhOGIyYTUtZTAwZi00NzE4LWIxMTEtYmUxODViNjk5Y2VlXkEyXkFqcGc@._V1_QL75_UX50_CR0,0,50,74_.jpg"
    },
    {
        "title": "The Roses (2025)",
        "url": "https://www.imdb.com/title/tt31973693/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BNDdkMDk2ODQtZDg2ZS00Yjk1LTg2MjUtMzA4YzVkZDkzYzhmXkEyXkFqcGc@._V1_QL75_UX50_CR0,0,50,74_.jpg"
    },
    {
        "title": "American Summer (2025)",
        "url": "https://www.imdb.com/title/tt6523546/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BMjI5OGIzMjgtMzU3MS00YzA4LWJhYTMtM2IwNjJhNDRlYjc0XkEyXkFqcGc@._V1_QL75_UX50_CR0,1,50,74_.jpg"
    },
    {
        "title": "Another in the Fire (2025)",
        "url": "https://www.imdb.com/title/tt28784201/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BNDViN2RmZTQtYzI5NS00Y2I2LTkwZmMtYjEyYjJjMDZiYTFjXkEyXkFqcGc@._V1_QL75_UY74_CR3,0,50,74_.jpg"
    },
    {
        "title": "Jessica Frost (2025)",
        "url": "https://www.imdb.com/title/tt4519000/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BZThmMDMxZTAtZTllNy00N2QzLTkzMzQtNDk2YTRkNzYyM2Y4XkEyXkFqcGc@._V1_QL75_UY74_CR8,0,50,74_.jpg"
    },
    {
        "title": "The Conjuring: Last Rites (2025)",
        "url": "https://www.imdb.com/title/tt22898462/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BOGRhNWVhZWUtNWUzMi00ZWQ0LWI3YmUtNTk5YTNiNDRlNDEwXkEyXkFqcGc@._V1_QL75_UX50_CR0,0,50,74_.jpg"
    },
    {
        "title": "Twinless (2025)",
        "url": "https://www.imdb.com/title/tt31322753/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BYWFjMDJhYzktNWY2OS00ODMzLTllZmMtODYwZWEyZjVmOGY0XkEyXkFqcGc@._V1_QL75_UY74_CR0,0,50,74_.jpg"
    },
    {
        "title": "Light of the World (2025)",
        "url": "https://www.imdb.com/title/tt33235979/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BYjkyMDNjNTYtODdmMy00NTkzLWIzYTgtNWE0YjBhZGVhZmQyXkEyXkFqcGc@._V1_QL75_UX50_CR0,0,50,74_.jpg"
    },
    {
        "title": "Downton Abbey: The Grand Finale (2025)",
        "url": "https://www.imdb.com/title/tt31888477/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BOGQ1ZTBlZmUtYmQ4Zi00YzcyLWI1ZDgtYTRjYjAzYWNkMjkxXkEyXkFqcGc@._V1_QL75_UY74_CR5,0,50,74_.jpg"
    },
    {
        "title": "The Long Walk (2025)",
        "url": "https://www.imdb.com/title/tt10374610/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BNmE4YmIxNWQtMzJhMy00NDI5LWFmYjEtMGYyMmFhNzdjODVmXkEyXkFqcGc@._V1_QL75_UX50_CR0,0,50,74_.jpg"
    },
    {
        "title": "Spinal Tap II: The End Continues (2025)",
        "url": "https://www.imdb.com/title/tt20222166/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BZWNmOWQwNDctNmJiMC00MDIyLTlmOWMtZGFjNTBhZjdjOWFjXkEyXkFqcGc@._V1_QL75_UX50_CR0,1,50,74_.jpg"
    },
    {
        "title": "Him (2025)",
        "url": "https://www.imdb.com/title/tt20990442/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BYmJkMTAyYzYtZWE0ZC00YjlkLWEyZmYtMjI1NzU4ZWRkNzhmXkEyXkFqcGc@._V1_QL75_UX50_CR0,8,50,74_.jpg"
    },
    {
        "title": "A Big Bold Beautiful Journey (2025)",
        "url": "https://www.imdb.com/title/tt13650700/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BYWI5MjM2MDQtMDI1YS00NWY2LTgzYTQtN2Y3MDc2MDBhZmIxXkEyXkFqcGc@._V1_QL75_UX50_CR0,1,50,74_.jpg"
    },
    {
        "title": "One Battle After Another (2025)",
        "url": "https://www.imdb.com/title/tt30144839/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BYzA5ZTMyMWYtMWEwZS00MTU4LTgwMjktYTE5OTU1YzFjMGRiXkEyXkFqcGc@._V1_QL75_UY74_CR5,0,50,74_.jpg"
    },
    {
        "title": "The Strangers: Chapter 2 (2025)",
        "url": "https://www.imdb.com/title/tt28671344/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BNjE5MDY2ZmMtNjJlNi00ZGE0LTg1MzctMWI4NjY1NTM4ZDFjXkEyXkFqcGc@._V1_QL75_UY74_CR5,0,50,74_.jpg"
    },
    {
        "title": "Gabby's Dollhouse: The Movie (2025)",
        "url": "https://www.imdb.com/title/tt32214143/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BMmUwNTg3ODMtZGQxZi00Y2VmLWJhMTEtZTc5ZGM1Nzc5MDViXkEyXkFqcGc@._V1_QL75_UX50_CR0,3,50,74_.jpg"
    },
    {
        "title": "Bau: Artist at War (2024)",
        "url": "https://www.imdb.com/title/tt8839576/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BZWRmYmNlNmYtMjc5ZC00ODY4LWIxOTEtYzJiNWFmOTI4ZDQwXkEyXkFqcGc@._V1_QL75_UY74_CR1,0,50,74_.jpg"
    },
    {
        "title": "The Smashing Machine (2025)",
        "url": "https://www.imdb.com/title/tt11214558/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BOWYxZTM1ZGMtMjg5MC00NzcyLTk0ZTEtZWI0ZThkNDJiYjZmXkEyXkFqcGc@._V1_QL75_UX50_CR0,2,50,74_.jpg"
    },
    {
        "title": "Michael (2025)",
        "url": "https://www.imdb.com/title/tt11378946/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BZTU3ZDhjODUtODEwMy00OWRmLWIyZDUtNTc4NjNiOWU5MzNjXkEyXkFqcGc@._V1_QL75_UX50_CR0,1,50,74_.jpg"
    },
    {
        "title": "We Harvest (2025)",
        "url": "https://www.imdb.com/title/tt7193124/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BZDk0YmI4MTUtZDM3ZC00MGI4LTk5OTUtYjRmNzBiNmU4Zjk0XkEyXkFqcGc@._V1_QL75_UX50_CR0,0,50,74_.jpg"
    },
    {
        "title": "The Legend of Johnny Jones (2025)",
        "url": "https://www.imdb.com/title/tt10928904/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BNzYzNzcxZWQtNmQ2Ni00MzQ4LTliMTQtNDg4ODFhMDM5NTJiXkEyXkFqcGc@._V1_QL75_UY74_CR3,0,50,74_.jpg"
    },
    {
        "title": "Tron: Ares (2025)",
        "url": "https://www.imdb.com/title/tt6604188/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BMmJiMWE2NTYtZWMyZC00Yzg0LTg0YjItZDM3ODlkYTRhNWNlXkEyXkFqcGc@._V1_QL75_UX50_CR0,0,50,74_.jpg"
    },
    {
        "title": "Kiss of the Spider Woman (2025)",
        "url": "https://www.imdb.com/title/tt30400277/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BNGU2MDY5MjItZTFkZi00ZTEwLTkwODctYmY4Y2FlNjBmMzEwXkEyXkFqcGc@._V1_QL75_UX50_CR0,1,50,74_.jpg"
    },
    {
        "title": "Soul on Fire (2025)",
        "url": "https://www.imdb.com/title/tt28078628/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BMzc0OTNlOWEtNDRmOC00MWUyLWI4MjItMTIxNTI4Yjk1MDEyXkEyXkFqcGc@._V1_QL75_UX50_CR0,0,50,74_.jpg"
    },
    {
        "title": "Bone Lake (2024)",
        "url": "https://www.imdb.com/title/tt26783625/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BM2FmOTdhMDItZjRkMS00Nzk2LTg1YjItY2ZiOTMzZTI3Y2E4XkEyXkFqcGc@._V1_QL75_UX50_CR0,1,50,74_.jpg"
    },
    {
        "title": "Dr. A. P. J. Abdul Kalam (2025)",
        "url": "https://www.imdb.com/title/tt15845656/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BMDViZmM0ZTgtYmJlMi00YTg2LWJmMzktZjU0YzFmMTlmNDFmXkEyXkFqcGc@._V1_QL75_UY74_CR3,0,50,74_.jpg"
    },
    {
        "title": "Black Phone 2 (2025)",
        "url": "https://www.imdb.com/title/tt29644189/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BMDM5ZmZjMGMtMjgwYy00NDRjLWIxM2EtZjYxZDk2YWI4M2JhXkEyXkFqcGc@._V1_QL75_UX50_CR0,1,50,74_.jpg"
    },
    {
        "title": "Falcon Express (2025)",
        "url": "https://www.imdb.com/title/tt36424914/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BMTZlOWZkOGYtYWY4Yi00OGI1LTgwZDMtZjRkOWRlYzM4YmRjXkEyXkFqcGc@._V1_QL75_UX50_CR0,0,50,74_.jpg"
    },
    {
        "title": "The Watchers (2025)",
        "url": "https://www.imdb.com/title/tt30874432/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BN2E4YWQ1YWUtNjcwNC00MGNlLWJlZDctMzYxMDVkNjI0NDkxXkEyXkFqcGc@._V1_QL75_UY74_CR3,0,50,74_.jpg"
    },
    {
        "title": "Mistress Dispeller (2024)",
        "url": "https://www.imdb.com/title/tt22060498/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BMWM0NTQ3ZjQtMGEwYy00YzIyLTgzYjUtOGNiZDI4MzBjODcyXkEyXkFqcGc@._V1_QL75_UX50_CR0,0,50,74_.jpg"
    },
    {
        "title": "Detour 95 (2025)",
        "url": "https://www.imdb.com/title/tt10844184/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BYzQ1YTQyM2MtNjZiZC00NjdmLTkwMWYtZTk0NDAxOGIwZmVjXkEyXkFqcGc@._V1_QL75_UX50_CR0,1,50,74_.jpg"
    },
    {
        "title": "Gekijô-ban Chensô Man Reze-hen (2025)",
        "url": "https://www.imdb.com/title/tt30472557/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BZTJmMDg4NWQtNTRkMi00ZGQyLTg1MzMtNDljZWFlZGI2ZmFiXkEyXkFqcGc@._V1_QL75_UY74_CR2,0,50,74_.jpg"
    },
    {
        "title": "The Third Parent (2025)",
        "url": "https://www.imdb.com/title/tt8702454/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BYmRlNWRkNGMtNDZkMi00Mjg3LWI1YTMtMTIxZTQ5N2NmOWE0XkEyXkFqcGc@._V1_QL75_UY74_CR4,0,50,74_.jpg"
    },
    {
        "title": "Predator: Badlands (2025)",
        "url": "https://www.imdb.com/title/tt31227572/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BZTgxMzllM2YtZDMyNS00YmJlLWE4MGEtNDNjZTA5YjAwNzgwXkEyXkFqcGc@._V1_QL75_UX50_CR0,0,50,74_.jpg"
    },
    {
        "title": "Christmas Eve (2025)",
        "url": "https://www.imdb.com/title/tt8857166/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BNjUxNGRiNmQtMDg5Zi00MDk1LWE1YTctMjk2MjBmZmM5MTkwXkEyXkFqcGc@._V1_QL75_UX50_CR0,4,50,74_.jpg"
    },
    {
        "title": "The Cincinnati Spin (2025)",
        "url": "https://www.imdb.com/title/tt10115998/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BMDhkMTc2NzMtNjM5Yy00MDZiLWFlNjItNTE4ZjFmZmYwNGQ3XkEyXkFqcGc@._V1_QL75_UY74_CR0,0,50,74_.jpg"
    },
    {
        "title": "Now You See Me: Now You Don't (2025)",
        "url": "https://www.imdb.com/title/tt4712810/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BNTZlYzdjMzgtYjU2ZC00MGQ5LWFiMDYtOTIwNzQ0M2MyNmU2XkEyXkFqcGc@._V1_QL75_UX50_CR0,0,50,74_.jpg"
    },
    {
        "title": "Indecipherable (2025)",
        "url": "https://www.imdb.com/title/tt34536268/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BOGNkZGZlMTAtMzI2OS00YWE5LWFjNGEtNzhiMTViNWY1ODA5XkEyXkFqcGc@._V1_QL75_UX50_CR0,4,50,74_.jpg"
    },
    {
        "title": "A Figgly Christmas (2025)",
        "url": "https://www.imdb.com/title/tt10994300/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BYTQ2ZTI2MzMtYmFjYy00OGRlLWE4YTktMzNiYjFlYmNkZmIxXkEyXkFqcGc@._V1_QL75_UX50_CR0,1,50,74_.jpg"
    },
    {
        "title": "Wicked: For Good (2025)",
        "url": "https://www.imdb.com/title/tt19847976/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BM2I3YmI1YWEtNGZkNS00NDczLWEzMGYtYzk1ZDIwMTg5NTg0XkEyXkFqcGc@._V1_QL75_UX50_CR0,5,50,74_.jpg"
    },
    {
        "title": "Return to Silent Hill (2025)",
        "url": "https://www.imdb.com/title/tt22868010/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BN2QzOTYzM2MtNjQwNS00YjYzLTg5Y2QtYWRjNjZhNGEyZTNhXkEyXkFqcGc@._V1_QL75_UY74_CR47,0,50,74_.jpg"
    },
    {
        "title": "David (2025)",
        "url": "https://www.imdb.com/title/tt15678738/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BN2I3MmMwY2QtZDZkYi00ZDMzLTg5ZjMtNWFkYWNkNDdkZjU1XkEyXkFqcGc@._V1_QL75_UY74_CR1,0,50,74_.jpg"
    },
    {
        "title": "STZ (2025)",
        "url": "https://www.imdb.com/title/tt10994444/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BZjUzNDhjNWEtOGM1ZS00YzQ3LWI2M2YtZmYyMjRlMjZlYjFhXkEyXkFqcGc@._V1_QL75_UX50_CR0,1,50,74_.jpg"
    },
    {
        "title": "Zootopia 2 (2025)",
        "url": "https://www.imdb.com/title/tt26443597/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BZGJjNWExZjAtODNjYy00ZWZiLWE5ZTYtN2Y1YTAwNzQ3MWIyXkEyXkFqcGc@._V1_QL75_UX50_CR0,0,50,74_.jpg"
    },
    {
        "title": "The Accident (2025)",
        "url": "https://www.imdb.com/title/tt10713496/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BY2NlZmI1NzUtYTUwZi00ODMyLThiODMtMjEyY2M5ZTYzNmI4XkEyXkFqcGc@._V1_QL75_UX50_CR0,1,50,74_.jpg"
    },
    {
        "title": "Five Nights at Freddy's 2 (2025)",
        "url": "https://www.imdb.com/title/tt30274401/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BMTAzNTE3YjctNjMxMy00OGZlLWJlM2EtZjc3MGM5ODVlZjg5XkEyXkFqcGc@._V1_QL75_UX50_CR0,0,50,74_.jpg"
    },
    {
        "title": "Hateshinaki Scarlet (2025)",
        "url": "https://www.imdb.com/title/tt35114460/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BMTlkMzdiMTctZjIyYy00ZjMzLTkwMGQtZGNiZWEyOTYwNjc2XkEyXkFqcGc@._V1_QL75_UY74_CR5,0,50,74_.jpg"
    },
    {
        "title": "Avatar: Fire and Ash (2025)",
        "url": "https://www.imdb.com/title/tt1757678/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BYjE0OWZmYWMtZjBhMi00YzM5LTkzOTctOTZhMTIwNDcxY2U0XkEyXkFqcGc@._V1_QL75_UY74_CR12,0,50,74_.jpg"
    },
    {
        "title": "Bethlehem (2025)",
        "url": "https://www.imdb.com/title/tt34491649/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BYTFiYWMxNjAtM2MxZi00NWIxLTlkYTAtZGQ5NmVmMmYzMzY4XkEyXkFqcGc@._V1_QL75_UY74_CR1,0,50,74_.jpg"
    },
    {
        "title": "The SpongeBob Movie: Search for SquarePants (2025)",
        "url": "https://www.imdb.com/title/tt23572848/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BMzliZGExYWYtZTEwMi00ZGQ1LWE1NWYtN2I4YTc5ODJlMTk0XkEyXkFqcGc@._V1_QL75_UY74_CR3,0,50,74_.jpg"
    },
    {
        "title": "The Street Avenger (2025)",
        "url": "https://www.imdb.com/title/tt10921118/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BODg4M2ZiNmQtODhkYi00YjhhLWEwMWItOTJlYmYzNTliNDgxXkEyXkFqcGc@._V1_QL75_UX50_CR0,7,50,74_.jpg"
    },
    {
        "title": "Return of the Living Dead (2025)",
        "url": "https://www.imdb.com/title/tt31350873/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BMTkyNjNjZWQtYWFhMi00NTczLTk1NDgtZGJhMjkwMGQ0MjU5XkEyXkFqcGc@._V1_QL75_UX50_CR0,1,50,74_.jpg"
    },
    {
        "title": "Song Sung Blue (2025)",
        "url": "https://www.imdb.com/title/tt30343021/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BOWUyNmM2NWMtYTY3OC00OWMxLTg1ZDMtYmIyNzM4MWI4NjM5XkEyXkFqcGc@._V1_QL75_UY74_CR44,0,50,74_.jpg"
    },
    {
        "title": "Planet Gliese (2025)",
        "url": "https://www.imdb.com/title/tt11246550/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BYzExNWI2MDAtMDhmNy00ZmI0LWIwOGEtZDFlNDY4N2ZiYzU0XkEyXkFqcGc@._V1_QL75_UY74_CR2,0,50,74_.jpg"
    },
    {
        "title": "Alien Wars: Judgment Day (2025)",
        "url": "https://www.imdb.com/title/tt10209920/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BNzUyMjNlZmEtZDQxZC00ZDBjLThiNWUtNDFlMmE0ODMzMTljXkEyXkFqcGc@._V1_QL75_UX50_CR0,1,50,74_.jpg"
    },
    {
        "title": "Killer Clown Girls (2025)",
        "url": "https://www.imdb.com/title/tt28371961/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BNGUzYjllZDYtMDFkNi00MjY3LTkwMzUtNDdhMzU5YzdiNDZlXkEyXkFqcGc@._V1_QL75_UX50_CR0,2,50,74_.jpg"
    },
    {
        "title": "Apophis 2029 (2025)",
        "url": "https://www.imdb.com/title/tt9810236/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BNjA3NGE5MTctYjljZi00ZjkyLWI0ZWMtZjYzODRkZDc1NTVlXkEyXkFqcGc@._V1_QL75_UX50_CR0,1,50,74_.jpg"
    },
    {
        "title": "Nightmare (2025)",
        "url": "https://www.imdb.com/title/tt32020960/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BNzVhYmNiM2UtOGNlZS00NzVjLTkwNDctOThlMzM3NWQ5M2UxXkEyXkFqcGc@._V1_QL75_UX50_CR0,1,50,74_.jpg"
    },
    {
        "title": "The King, The Swordsman, and the Sorceress (2025)",
        "url": "https://www.imdb.com/title/tt9810278/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BZWI2YzQzZjYtZTVhOS00ODdmLTg1MzgtYTAxYWFkMjQ3Y2E0XkEyXkFqcGc@._V1_QL75_UX50_CR0,1,50,74_.jpg"
    },
    {
        "title": "Crystal (2025)",
        "url": "https://www.imdb.com/title/tt15295176/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BNzVhNzM0NTctZDQwMS00NjYyLTkzMzYtMTM4YmFlOWM1ODc4XkEyXkFqcGc@._V1_QL75_UX50_CR0,1,50,74_.jpg"
    },
    {
        "title": "Wuthering Heights (2025)",
        "url": "https://www.imdb.com/title/tt32897959/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BMzJiODEzY2UtNzNkMy00MTRlLWEzZTYtZDI4ZTg0ZWI4ZTkwXkEyXkFqcGc@._V1_QL75_UY74_CR13,0,50,74_.jpg"
    },
    {
        "title": "GOAT (2026)",
        "url": "https://www.imdb.com/title/tt27613895/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BYTYzYmY2NGYtMDFkMC00YmNlLWE0YWUtYjUzODczOWEwOTI0XkEyXkFqcGc@._V1_QL75_UY74_CR3,0,50,74_.jpg"
    },
    {
        "title": "What About Love (2013)",
        "url": "https://www.imdb.com/title/tt2263648/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BYzdhNTJlMDItMzhkYS00ZGQ1LWEyYmYtYjE2ZTQ5NzBhZTQwXkEyXkFqcGc@._V1_QL75_UX50_CR0,2,50,74_.jpg"
    },
    {
        "title": "Scream 7 (2026)",
        "url": "https://www.imdb.com/title/tt27047903/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BMGM0MGUzNDgtZGMxZC00OWJlLTk0NTYtNzA5NzVhYTFmMmQ2XkEyXkFqcGc@._V1_QL75_UY74_CR0,0,50,74_.jpg"
    },
    {
        "title": "The Cat in the Hat (2026)",
        "url": "https://www.imdb.com/title/tt2321555/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BMzY4MjI2ZWUtMDA0Mi00ZWExLTgyZTQtYjY2NGJhNjJiNmFhXkEyXkFqcGc@._V1_QL75_UY74_CR41,0,50,74_.jpg"
    },
    {
        "title": "Hoppers (2026)",
        "url": "https://www.imdb.com/title/tt26443616/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BNWJiYWNlMzItMDAzNC00ZjAxLTg1Y2EtNjMwYWQzOTIwZDRhXkEyXkFqcGc@._V1_QL75_UY74_CR23,0,50,74_.jpg"
    },
    {
        "title": "Project Hail Mary (2026)",
        "url": "https://www.imdb.com/title/tt12042730/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BOWZmNzgwOWUtMThiNS00ZjZmLWE2MTYtNTc2YzkyMTIxZjMxXkEyXkFqcGc@._V1_QL75_UX50_CR0,1,50,74_.jpg"
    },
    {
        "title": "The Singing Priest (2026)",
        "url": "https://www.imdb.com/title/tt32207971/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BMDhiZDkyMzctZWE0Mi00ODY3LTkxYTAtOTkzOTAwYzdmZGY0XkEyXkFqcGc@._V1_QL75_UY74_CR41,0,50,74_.jpg"
    },
    {
        "title": "The Mummy (2026)",
        "url": "https://www.imdb.com/title/tt32612507/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BMWY3YzRiY2ItZGZmMi00ZWI4LThmZGItZTYzNWI5Yjk0ZDI0XkEyXkFqcGc@._V1_QL75_UX50_CR0,8,50,74_.jpg"
    },
    {
        "title": "Avengers: Doomsday (2026)",
        "url": "https://www.imdb.com/title/tt21357150/?ref_=rlm",
        "poster": "https://m.media-amazon.com/images/M/MV5BMGNiN2RlZTMtMTkyZC00YjkwLTgyY2QtMDg1ZDNhODQwNWM4XkEyXkFqcGc@._V1_QL75_UX50_CR0,0,50,74_.jpg"
    }
]

const getData = async (url) => {
    try {
        const res = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            },
            timeout: 5000
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const htmlText = await res.text();
        const $ = cheerio.load(htmlText);

        const titleArr = $('h1[data-testid=hero__pageTitle]');
        const title = titleArr.length > 0 ? $(titleArr).eq(0).text().trim() : "";


        const posterArr = $('div[data-testid=hero-media__poster] > div > img');
        const poster = posterArr.length > 0 ? $(posterArr).eq(0).attr('src') : "";

        const releaseArr = $('div[data-testid=tm-box-up-date]');
        const release = releaseArr.length > 0 ? $(releaseArr).eq(0).text().trim() : "";

        const ratingArr = $('div[data-testid=hero-rating-bar__aggregate-rating__score]');
        const rating = ratingArr.length > 0 ? $(ratingArr).eq(0).text().trim() : "";

        const descArr = $('p[data-testid=plot] > span[data-testid=plot-xs_to_m]');
        const description = descArr.length > 0 ? $(descArr).eq(0).text().trim() : "";

        const lengthFnc = () => {
            const lenArr = $('section[data-testid=hero-parent] > div.sc-3b24bae4-3.iDcCm > div.sc-bf57f3f2-0.gDRYed > ul > li');
            if (lenArr.length === 0) return "";
            return lenArr.map((i, item) => $(item).text().trim()).get();
        }
        const len = lengthFnc();
        const length = len.length > 0 ? len.join(" ") : "";

        const catFnc = () => {
            const selectCat = $('div[data-testid=interests] > div');
            if (selectCat.length < 2) return [];
            const findCat = $(selectCat).eq(1).find('a');
            if (findCat.length === 0) return [];
            return findCat.map((i, item) => $(item).text().trim()).get();
        }
        const category = catFnc();

        const directorsFnc = () => {
            const selectDirectors = $('li[data-testid=title-pc-principal-credit]');
            if (selectDirectors.length === 0) return [];
            const targetedLi = $(selectDirectors).eq(0).find('ul > li');
            return targetedLi.map((i, item) => $(item).text().trim()).get();
        }
        const directors = directorsFnc();

        const writersFnc = () => {
            const selectWriters = $('li[data-testid=title-pc-principal-credit]');
            if (selectWriters.length < 2) return [];
            const targetedLi = $(selectWriters).eq(1).find('ul > li');
            return targetedLi.map((i, item) => $(item).text().trim()).get();
        }
        const writers = writersFnc();


        const castsFnc = () => {
            const selectCast = $('div[data-testid=title-cast-item]');
            if (selectCast.length === 0) return [];
            const targetedCast = selectCast.map((i, item) => {
                const selectName = $(item).find('div:nth-child(2) > a');
                if (selectName === 0) return null;
                return $(selectName).eq(0).text().trim();
            }).get();
            return targetedCast;
        }
        const cast = castsFnc();


        return { url, title, poster, release, rating, length, description, category, directors, writers, cast };
    } catch (err) {
        console.error(err);
    }

};





export const GET = async (Request) => {
    try {

        const result = [];
        for (let i = 0; i < list.length; i++) {
            const url = list[i].url;
            const res = await getData(url);
            result.push(res);
            console.log(`${i + 1} / ${list.length}`);
        }


        return NextResponse.json(result, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            }
        });


    } catch (error) {
        console.error('Error in GET handler:', error);
        return NextResponse.json({
            message: "An error occurred while fetching data",
            error: error.message
        }, {
            status: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            }
        });
    }

}